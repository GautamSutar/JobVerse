from django.urls import path 
from .views import CreateJobView, ListAllJobsCreatedByHR, RetrieveJobByIdView,ListAllJobsForStudent, UpdateJobView, DeleteJobView,  JobViewSet



urlpatterns = [
    path('create/', CreateJobView.as_view(), name='create-job'),
    path('list-all-jobs/', ListAllJobsCreatedByHR.as_view(), name='list-all-jobs'),
    path('list-all-jobs-for-student/', ListAllJobsForStudent.as_view(), name='list-all-jobs'),
    path('list-job/<int:id>/', RetrieveJobByIdView.as_view(), name='job-detail'),
    path('update-job/<int:id>/', UpdateJobView.as_view(), name='update-job'),
    path('delete-job/<int:id>/', DeleteJobView.as_view(), name='delete-job'),
     path('<int:pk>/applicants/',JobViewSet.as_view({'get': 'list_applicants'}),name='job-applicants-list'),
]
