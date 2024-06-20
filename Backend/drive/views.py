from django.http import FileResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import File, Folder
import uuid
from .serializer import FileSerializer, FolderSerializer

# Create your views here.        
class ContentFolderView(APIView):
    def get(self, request, folderID=None, format=None):
        path = [{'name': 'root'}]
        if folderID :
            try:
                folder = Folder.objects.get(pk=folderID)
            except Folder.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            path = path + FolderSerializer(folder.getParentFolders(), many=True).data

            subfolders = Folder.objects.filter(parent_folder=folder)
            files = File.objects.filter(folder=folder)
        else:
            subfolders = Folder.objects.filter(parent_folder=None)
            files = File.objects.filter(folder=None)

        folderSerializer = FolderSerializer(subfolders, many=True)
        fileSerializer = FileSerializer(files, many=True)
        return Response({
            'folders': folderSerializer.data,
            'files': fileSerializer.data,
            'folder_id': folderID,
            'path': path
        })

class CreateFolderView(APIView):
    def post(self, request, folderID=None, format=None):
        folder = 'root'
        parent_folder = None
        if folderID is not None:
            folder = folderID
            try:
                parent_folder = Folder.objects.get(pk=folderID)
            except Folder.DoesNotExist:
                return Response(data={'folderID': folder}, status=status.HTTP_404_NOT_FOUND)
            
        nameDir = request.POST['nameDir']
        if nameDir != '':
            folder_id = str(uuid.uuid4())
            newFolder = Folder(id=folder_id, name=nameDir, parent_folder=parent_folder)
            newFolder.save()
            return Response(data={'folderID': folder}, status=status.HTTP_201_CREATED)
        
        return Response(data={'folderID': folder}, status=status.HTTP_404_NOT_FOUND)

class DeleteFolderView(APIView):
    def delete(self, request, pk, format=None):
        folder = Folder.objects.get(pk=pk)
        files = File.objects.filter(folder=folder)

        for file in files:
            file.file.delete()

        parent_folder = folder.parent_folder_id if folder.parent_folder_id else 'root'
        folder.delete()
        return Response(data={'folderID': parent_folder}, status=status.HTTP_200_OK)

class UploadFileView(APIView):
    def post(self, request, folderID=None, format=None):
        folder = None
        parent_folder = 'root'
        if folderID is not None:
            folder = Folder.objects.get(pk=folderID)
            parent_folder = folderID

        files = request.FILES.getlist('files')
        for file in files:
            newFile = File(name=file.name, file=file, folder=folder)
            newFile.save()
            
        return Response(data={'folderID': parent_folder}, status=status.HTTP_200_OK)

class DownloadFileView(APIView):
    def get(self, request, pk, format=None):
        try:
            file = File.objects.get(pk=pk)
            response = FileResponse(open(file.file.path, 'rb'))
            response['Content-Disposition'] = f'attachment; filename="{file.name}"'
            return response
        except:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)

class DeleteFileView(APIView):
    def delete(self, request, pk, format=None):
        file = File.objects.get(pk=pk)
        parent_folder = file.folder.id if file.folder else 'root'
        file.file.delete()
        file.delete()
        return Response(data={'folderID': parent_folder}, status=status.HTTP_200_OK)
    
