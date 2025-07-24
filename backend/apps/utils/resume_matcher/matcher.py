import re
import fitz  # PyMuPDF
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util
import spacy

nlp = spacy.load("en_core_web_sm")
model = SentenceTransformer("all-MiniLM-L6-v2")

def extract_text_from_pdf(file):
    with fitz.open(stream=file.read(), filetype='pdf' ) as doc:
        return " ".join(page.get_text() for page in doc)

def clean_text(text):
    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words("english"))
    text = re.sub(r"[^\w\s]", "", text.lower())
    tokens = [lemmatizer.lemmatize(word) for word in text.split() if word not in stop_words]
    return " ".join(tokens)

def keyword_match_score(resume, jd_keywords):
    resume_words = set(resume.split())
    jd_words = set(jd_keywords.split())
    return len(resume_words & jd_words) / len(jd_words) * 100 if jd_words else 0

def tfidf_score(resume, jd):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume, jd])
    return cosine_similarity(vectors[0:1], vectors[1:2])[0][0] * 100

def ner_skill_match_score(resume, jd):
    doc_resume = nlp(resume)
    doc_jd = nlp(jd)
    resume_ents = set(ent.text.lower() for ent in doc_resume.ents if ent.label_ in ["ORG", "SKILL", "PRODUCT"])
    jd_ents = set(ent.text.lower() for ent in doc_jd.ents if ent.label_ in ["ORG", "SKILL", "PRODUCT"])
    return len(resume_ents & jd_ents) / len(jd_ents) * 100 if jd_ents else 0

def embedding_score(resume, jd):
    embeddings = model.encode([resume, jd])
    return util.cos_sim(embeddings[0], embeddings[1]).item() * 100

def calculate_resume_score(resume_file, job_description, job_skills):
    raw_resume = extract_text_from_pdf(resume_file)
    resume = clean_text(raw_resume)
    jd = clean_text(job_description)
    skills = clean_text(job_skills)

    score = (
        0.25 * keyword_match_score(resume, skills) +
        0.30 * tfidf_score(resume, jd) +
        0.20 * ner_skill_match_score(resume, jd) +
        0.25 * embedding_score(resume, jd)
    )
    return round(score, 2)

