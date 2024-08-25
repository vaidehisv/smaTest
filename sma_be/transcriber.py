import speech_recognition as sr
from pydub import AudioSegment


def video_to_audio(video_file_path: str, audio_file_path: str, vid_format: str = "mp4", aud_format: str = "wav") -> None:
    video = AudioSegment.from_file(video_file_path, format=vid_format)
    audio = video.set_channels(1).set_frame_rate(16000).set_sample_width(2)
    audio.export(audio_file_path, format=aud_format)


def get_text_from_audio(r: sr.Recognizer, audio_file_path: str) -> str:
    with sr.AudioFile(audio_file_path) as source:
        audio_text: str = r.record(source)
    return r.recognize_google(audio_text, language="en-US")

# See if audio has any non-dictionary (no abiding to target language) word and notify about it
# Use keywords to highlight timestamps.

"""
Video Transcriber
1. First get the audio data from the video using mostly wav file as it can processed with more accuracy
2. Get the text data from the audio using  speech recognizer
3. Save the video transcription in a text file

Text summarization using WebVTT (Web Video Text Tracks) files
1. Get the WebVTT file for zoom/teams meeting which has the meeting transcription
2. As vtt file has more data than we need, we need to clean the file to get only necessary data
3. After cleaning the vtt file, we need to tokenize the file to form tokens using nltk library
4. The tokenized data has to be divided into chunks of manageable size to get more correct summary
5. Each chunk of data is then converted into prompt request required by OpenAI API to get summary
6. The text summary of each chunk is collected into a list.
7. The entire list of summaries is passed to openAI to get consolidated summary
8. Similarly, each chunk formed in step 4 are passed to openAI API to get action items
9. The action item of each chunk is then collected into single list.
10. The list of all action items are then sent to openAI to get a consolidated list of action items
11. The list of action items would be compared with the given agenda to suggest the agenda of next meeting.
"""


def transcribe_video(video_file_path: str, audio_file_path: str) -> None:
    # 1. Convert video to audio (wav)
    # 2. Pass the audio file to speech-recognizer and get the text back
    # 3. Store the text in the file
    try:
        r: sr.Recognizer = sr.Recognizer()
        video_to_audio(video_file_path, audio_file_path)
        text = get_text_from_audio(r, audio_file_path)
        print(f"The text from audio is: \n {text}")
    except Exception as ex:
        print(f"Failed to transcribe video due to {str(ex)}")


def main():
    video_file_path: str = "sample.mp4"
    audio_file_path: str = "sample.wav"
    transcribe_video(video_file_path, audio_file_path)


if __name__ == "__main__":
    main()
