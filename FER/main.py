import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
import cv2
from deepface import DeepFace

face_classifier = cv2.CascadeClassifier()
face_classifier.load(cv2.samples.findFile("haarcascade_frontalface_default.xml"))

cap = cv2.VideoCapture(0)
new_frame = None  # Define new_frame variable before the loop
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
            dominant_emotion = emotion_dict.get("dominant_emotion", "")
            if dominant_emotion in ["happy", "angry", "neutral"]:  # Filter desired emotions
                print("Detected Emotion:", dominant_emotion)  # Print detected emotion in the terminal
                cv2.putText(frame, text=dominant_emotion, org=(x, y), fontFace=cv2.FONT_HERSHEY_COMPLEX, fontScale=1, color=(0, 255, 0))
                new_frame = cv2.rectangle(frame, (x, y), (x+w, y+h), color=(255, 0, 0), thickness=2)

        if new_frame is not None and new_frame.shape[0] > 0 and new_frame.shape[1] > 0:  # Check valid dimensions
            # Resize the frame to a larger size
            resized_frame = cv2.resize(new_frame, (800, 600))
            cv2.imshow("", resized_frame)
        
        if cv2.waitKey(30) == 27:
            break

    except KeyboardInterrupt:
        break

cap.release()
cv2.destroyAllWindows()
