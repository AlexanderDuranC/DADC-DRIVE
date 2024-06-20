from django.db import models

# Create your models here.
class Folder(models.Model):
    id = models.CharField(primary_key=True, max_length=36, editable=False)
    name = models.CharField(max_length=100)
    parent_folder = models.ForeignKey('self', null=True, blank=True, related_name='subfolders', on_delete=models.CASCADE)

    def getParentFolders(self):
        parentFolders = [self]
        currentFolder = self

        while currentFolder.parent_folder:
            currentFolder = currentFolder.parent_folder
            parentFolders.append(currentFolder)
        
        return parentFolders[::-1]

class File(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to="files/")
    # owner = models.ForeignKey(User, on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder, null=True, blank=True, on_delete=models.CASCADE)