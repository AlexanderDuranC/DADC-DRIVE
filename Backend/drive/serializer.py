from rest_framework import serializers
from .models import Folder, File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'

class FolderSerializer(serializers.ModelSerializer):
    files = FileSerializer(many=True, read_only=True)
    subfolders = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = '__all__'

    def get_subfolders(self, obj):
        subfolders = Folder.objects.filter(parent_folder=obj)
        return FolderSerializer(subfolders, many=True).data