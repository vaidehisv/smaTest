import re
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score


def clean_vtt_file(file_path: str) -> str:
    file_lines: list[str] = []

    with open(file_path, "r") as fd:
        file_lines = fd.readlines()

    lines = [line.strip() for line in file_lines if line.strip()]
    lines = lines[1:] if lines[0].upper() == "WEBVTT" else lines

    # remove indexes from the lines
    lines = [line for line in lines if not line.isdigit()]

    pattern = r'[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}\/\d+-\d'
    lines = [line for line in lines if not re.match(pattern, line)]

    pattern = r'^\d{2}:\d{2}:\d{2}.\d{3}.*\d{2}:\d{2}:\d{2}.\d{3}$'
    lines = [line for line in lines if not re.match(pattern, line)]

    content = " ".join(lines)

    pattern = r"\s+"
    content = re.sub(pattern, r" ", content)

    pattern = r'([\.!?])(\w)'
    content = re.sub(pattern, r"\1 \2", content)

    return content


def save_transcription(file_in_path: str, file_out_path: str) -> None:
    clean_text: str = clean_vtt_file(file_in_path)
    with open(file_out_path, "w+", encoding="utf-8") as fd:
        fd.write(clean_text)


def eval_lan_model_results(results: list, actual_labels: list[str]) -> None:
    predicted_labels: list[str] = [result["choices"][0]["text"] for result in results]

    accuracy = accuracy_score(actual_labels, predicted_labels)
    precision = precision_score(actual_labels, predicted_labels)
    f1 = f1_score(actual_labels, predicted_labels)
    recall = recall_score(actual_labels, predicted_labels)

    print(f"Accuracy Score: {accuracy}\nPrecision: {precision}\nF1 Score: {f1}\nRecall: {recall}")


def main():
    file_path: str = "meeting.vtt"
    file_out: str = "meeting.txt"
    save_transcription(file_path, file_out)


if __name__ == "__main__":
    main()

