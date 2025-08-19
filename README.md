## 🌟 GitHub

### 🔄 Git Merge for Incoming Changes - Merging Branch 1 into Branch 2

1) git status - Check branch content  
2) git branch - Check on which branch you are right now (consider branch 1)  
3) git fetch - Pull the latest changes on your current branch  
4) git checkout (branch name - consider branch 2) - Switch to the branch where you want to merge the code  
5) git branch - Check branch, now you are in (consider branch 2)  
6) git pull origin branch 2 - Pull the latest changes from the remote branch  
7) git merge (branch name - consider branch 1)  

⚠️ Handling Merge Conflicts Efficiently:

To accept all incoming changes and resolve the commit at once:

8) git checkout --theirs .  
9) git add .  
10) git commit -m "Merged Gautam branch into replica, accepting all incoming changes"  
11) git push origin (branch name - consider branch 2)  

---

## 🚀 Django Start

1) cd backend
2) python -m venv venv313 (Create virtual environment for specific Python version)
3) source venv313/Scripts/activate (Activate the virtual environment every time)
4) pip install django
5) django-admin --version
6) pip install firebase-admin
7) pip show firebase-admin
8) pip install djangorestframework
9) pip install django-cors-headers
10) pip install google-generativeai
11) pip install python-dotenv
12) pip install pdfplumber
13) pip install python-docx
14) pip install django-environ
15) pip install google-cloud-speech google-cloud-texttospeech google-cloud-dialogflow google-cloud-language django-cors-headers
16) pip install dj-database-url python-decouple psycopg2-binary
1) python manage.py makemigrations
1) python manage.py migrate
1) python manage.py runserver


pip install djangorestframework
pip install djangorestframework-simplejwt









---

## ⚙️ Django Other Commands

1) python ../../manage.py startapp interviews_ai - Create a Django app inside `backend/app/interviews_ai/` with necessary files (`models.py`, `views.py`, `urls.py`, etc.)  
2) python manage.py makemigrations - Run this when new changes are made  
3) python manage.py migrate - Apply database migrations  
4) daphne Django.asgi:application --port 8001 ( Run server to connect websocket )

Redis Setup
5) https://github.com/MicrosoftArchive/redis/releases
6) doubled click on downloaded file
7) redis-cli --version
8) redis-cli -h redis-18784.crce182.ap-south-1-1.ec2.redns.redis-cloud.com -p 18784 -a IZDoNgvyxN3LLwUF0f6qZ2PZjWjbKm4O 
9) redis-18784.crce182.ap-south-1-1.ec2.redns.redis-cloud.com:18784> (You will get this, it means you are in redis cli then write - )
10) then write - PING
11) then you will get PONG
---

## 🌐 CORS Setup

🔹 Fixing CORS Errors:  
- Check the frontend URL port where it is running  
- Check if the correct CORS URL is present in `Django/settings.py`, and update the frontend port if you face any CORS policy error in your browser console  

---

## 🔥 Firebase Setup

### Firebase Dependencies:
1️⃣ pip install firebase-admin  
2️⃣ pip install django-firebase-auth  

---

## ❌ Port Error Handling

📌 ChatGPT Link - [ChatGPT Shared Link](https://chatgpt.com/share/67d17d54-6918-8009-9836-9bd98bec7ceb)  

### 🛠️ Fixing Frontend Port Errors

#### Error Message:
```bash
$ npm run dev
> frontend@0.0.0 dev
> vite
error when starting dev server:
    Error: Port 5173 is already in use
    at Server.onError (file:///D:/VS%20CODE/web%20development/Minor%20Project%20Notes/Ai/AI%20Interview/frontend/node_modules/vite/dist/node/chunks/dep-ByPKlqZ5.js:30662:18)
    at Server.emit (node:events:518:28)
    at emitErrorNT (node:net:1944:8)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
```

#### Steps to Resolve:
1️⃣ Find which process is using port 5173:
```bash
netstat -ano | findstr :5173
```
📌 Run this command in PowerShell or Command Prompt (not Git Bash)

#### Example Output:
```bash
PS D:\VS CODE\web development\Minor Project Notes\Ai\AI Interview> netstat -ano | findstr :5173
  TCP    [::1]:5173             [::]:0                 LISTENING       24896
```

2️⃣ Kill the process using the PID:
```bash
taskkill /PID <PID> /F
```

#### Example Output:
```bash
PS D:\VS CODE\web development\Minor Project Notes\Ai\AI Interview> taskkill /PID 24896 /F
SUCCESS: The process with PID 24896 has been terminated.
```

✅ Port 5173 is now free, restart your frontend server!  

---

📝 Note: This `README.md` maintains the same content but is now well-structured with proper formatting and emojis for clarity! 🚀





Python  Version Check Or specific Version Venv creation

1) py -3.10 --versio   (  for checking specific version  )
2) py -0            (  List All Installed Python Versions  )
3) python3.10 -m venv rasa_env
