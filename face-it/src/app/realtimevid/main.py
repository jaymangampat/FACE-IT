import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
import cv2
import matplotlib.pyplot as plt
import time
from deepface import DeepFace

face_classifier = cv2.CascadeClassifier()
face_classifier.load(cv2.samples.findFile("haarcascade_frontalface_default.xml"))

cap = cv2.VideoCapture(0)
emotions_count = {"Happy": 0, "Neutral": 0, "Angry": 0}  # Initialize emotions count dictionary
desired_emotions = ["happy", "neutral", "angry"]  # Desired emotions to detect

start_time = time.time()
interval = 3  # 3 seconds interval for emotion count

while True:
    try:
        ret, frame = cap.read()
        if not ret:
            break

        frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(frame_gray)
        response = DeepFace.analyze(frame, actions=("emotion",), enforce_detection=False)
        for face in faces:
            x, y, w, h = face
            emotion_dict = response[0]  # Access the first dictionary in the list
            dominant_emotion = emotion_dict.get("dominant_emotion", "").lower()
            if dominant_emotion in desired_emotions:  # Check if the emotion is in the desired emotions
                emotions_count[dominant_emotion.capitalize()] += 1  # Increment the count for the detected emotion

                cv2.putText(frame, text=dominant_emotion.capitalize(), org=(x, y),
                            fontFace=cv2.FONT_HERSHEY_COMPLEX, fontScale=1, color=(0, 255, 0))
                cv2.rectangle(frame, (x, y), (x + w, y + h), color=(255, 0, 0), thickness=2)

        cv2.imshow("", frame)

        if cv2.waitKey(30) == 27:
            break

        elapsed_time = time.time() - start_time
        if elapsed_time >= interval:
            print("Emotion Count:", emotions_count)
            emotions_count = {"Happy": 0, "Neutral": 0, "Angry": 0}  # Reset emotions count
            start_time = time.time()

    except KeyboardInterrupt:
        break

cap.release()
cv2.destroyAllWindows()

# Create a pie chart for emotions count
emotions = list(emotions_count.keys())
count = list(emotions_count.values())

plt.pie(count, labels=emotions, autopct='%1.1f%%')
plt.title('Feedback Chart')
plt.show()