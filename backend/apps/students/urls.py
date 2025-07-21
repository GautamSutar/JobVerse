from django.urls import path
from .views import (
    StudentProfileCreateUpdateView,
    CertificateCreateView, CertificateListView, CertificateUpdateView,
    TranscriptCreateView, TranscriptListView, TranscriptUpdateView,
    InternshipCreateView, InternshipListView, InternshipUpdateView,
    ProjectCreateView, ProjectListView, ProjectUpdateView,
    SkillPreferenceCreateView, SkillPreferenceListView, SkillPreferenceUpdateView,
    AchievementCreateView, AchievementListView, AchievementUpdateView,
)

urlpatterns = [
    # Student Profile
    path('student-profiles/', StudentProfileCreateUpdateView.as_view(), name='student_profile_create_update'),

    # Certificates
    path("certificates/", CertificateCreateView.as_view(), name="certificates"),
    path("certificates/list/", CertificateListView.as_view(), name="certificate-list"),
    path("certificates/<int:pk>/update/", CertificateUpdateView.as_view(), name="certificate-update"),

    # Transcripts
    path("transcripts/", TranscriptCreateView.as_view(), name="transcripts"),
    path("transcripts/list/", TranscriptListView.as_view(), name="transcript-list"),
    path("transcripts/<int:pk>/update/", TranscriptUpdateView.as_view(), name="transcript-update"),

    # Internships
    path("internships/", InternshipCreateView.as_view(), name="internships"),
    path("internships/list/", InternshipListView.as_view(), name="internship-list"),
    path("internships/<int:pk>/update/", InternshipUpdateView.as_view(), name="internship-update"),

    # Projects
    path("projects/", ProjectCreateView.as_view(), name="projects"),
    path("projects/list/", ProjectListView.as_view(), name="project-list"),
    path("projects/<int:pk>/update/", ProjectUpdateView.as_view(), name="project-update"),

    # Skill Preferences
    path("skill-preferences/", SkillPreferenceCreateView.as_view(), name="preferences"),
    path("skill-preferences/list/", SkillPreferenceListView.as_view(), name="preferences-list"),
    path("skill-preferences/<int:pk>/update/", SkillPreferenceUpdateView.as_view(), name="preferences-update"),

    # Achievements
    path("achievements/", AchievementCreateView.as_view(), name="achievements"),
    path("achievements/list/", AchievementListView.as_view(), name="achievement-list"),
    path("achievements/<int:pk>/update/", AchievementUpdateView.as_view(), name="achievement-update"),
]
