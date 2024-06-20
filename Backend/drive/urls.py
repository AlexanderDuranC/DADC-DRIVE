from django.urls import path
from .views import UploadFileView, DownloadFileView, DeleteFileView, ContentFolderView, CreateFolderView, DeleteFolderView


urlpatterns = [
    # Subida de archivos
    path('upload/', UploadFileView.as_view(), name='uploadFilesRoot'),
    path('upload/<str:folderID>/', UploadFileView.as_view(), name='files'),

    # Creacion de carpetas
    path('mkdir/', CreateFolderView.as_view(), name='createFolderRoot'),
    path('mkdir/<str:folderID>/', CreateFolderView.as_view(), name='createFolder'),

    # Contenido de las carpetas
    path('', ContentFolderView.as_view(), name='content'),
    path('<str:folderID>/', ContentFolderView.as_view(), name='content'),

    # Eliminacion de carpetas
    path('deleteFolder/<str:pk>/', DeleteFolderView.as_view(), name='deleteFolder'),

    # Descarga de archivos
    path('downloadFile/<str:pk>/', DownloadFileView.as_view(), name='downloadFile'),

    # Eliminacion de archivos
    path('deleteFile/<str:pk>/', DeleteFileView.as_view(), name='deleteFile'),
]