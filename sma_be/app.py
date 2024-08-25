import os
import openai
import nltk
import utils

nltk.download('punkt')
from nltk.tokenize import word_tokenize
openai.api_key = os.getenv("OPENAI_API_KEY")


def tokenize_file_content(file_path: str) -> list[str]:
    file_content: str = ""
    with open(file_path, "r") as fd:
        file_content = fd.read()
    return word_tokenize(file_content)


def get_file_chunks(tokens: list[str], chunk_sz: int, overlap_size: int):
    if len(tokens) <= chunk_sz:
        yield tokens
    else:
        yield tokens[:chunk_sz]
        yield from get_file_chunks(tokens[chunk_sz - overlap_size:], chunk_sz, overlap_size)


def break_file_in_chunks(tokens: list[str], chunk_sz: int = 2000, overlap_sz: int = 100) -> list[list[str]]:
    return list(get_file_chunks(tokens, chunk_sz, overlap_sz))


def get_token_length(tokens: list[str]) -> int:
    return len(tokens)


def get_prompt_from_tokens(tokens: list[str]) -> str:
    prompt_text: str = " ".join(tokens)
    prompt_text = prompt_text.replace(" 's", "'s")
    return prompt_text


def process_prompt(prompt_request: str, lan_model: str = "text-davinci-003", max_tokens: int = 500) -> str:
    response = openai.Completion.create(
        model=lan_model,
        prompt=prompt_request,
        temperature=.5,
        max_tokens=max_tokens,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0)
    return response["choices"][0]["text"].strip()


def summarize_text(chunks: list[list[str]]) -> list[str]:
    responses: list[str] = []
    for chunk in chunks:
        request: str = f"Summarize this meeting transcript: {get_prompt_from_tokens(chunk)}"
        response = process_prompt(request, "text-davinci-003", 500)
        responses.append(response)
    return responses


def consolidate_summary(responses: list[str]) -> str:
    request: str = f"Consolidate these meeting summaries: {str(responses)}"
    response = process_prompt(request, "text-davinci-003", 1000)
    return response


def get_summary_from_meeting(chunks: list[list[str]]) -> str:
    summaries: list[str] = summarize_text(chunks)
    consolidated_summary: str = consolidate_summary(summaries)
    return consolidated_summary


def get_action_items(chunks: list[list[str]]) -> list[str]:
    responses: list[str] = []
    for chunk in chunks:
        request: str = f"Provide a list of action items with a due date from the provided meeting transcript text: " \
                       f"{get_prompt_from_tokens(chunk)}"
        responses.append(process_prompt(request))
    return responses


def consolidate_action_items(prompts: list[str]) -> str:
    request: str = f"Consolidate these meeting action items: {str(prompts)}"
    return process_prompt(request)


def get_meeting_action_items(chunks: list[list[str]]) -> str:
    responses: list[str] = get_action_items(chunks)
    return consolidate_action_items(responses)


def run_app(vtt_file: str, vtt_out: str) -> None:
    utils.save_transcription(vtt_file, vtt_out)
    tokens: list[str] = tokenize_file_content(vtt_out)
    print(f"Total tokens found: {get_token_length(tokens)}")
    chunks: list[list[str]] = break_file_in_chunks(tokens, 10, 0)
    for i, chunk in enumerate(chunks):
        print(f"Size of chunk-{i}: {len(chunk)}")
    # get meeting summary
    # get meeting action items


def main() -> None:
    vtt_file_path: str = "meeting.vtt"
    vtt_file_out: str = "meeting.txt"
    run_app(vtt_file_path, vtt_file_out)


if __name__ == "__main__":
    main()
