using Core.Interfaces.Services;
using Core.Settings;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services;

public class FileService : IFileService
{
    private readonly IOptions<StorageSettings> _storageSettings;

    public FileService(IOptions<StorageSettings> settings)
    {
        _storageSettings = settings;
    }

    public async Task<string?> UploadFile(IFormFile? file, string? destination)
    {
        if (file is null || destination is null)
        {
            return null;
        }

        var fullPath = Path.Combine(destination, _storageSettings.Value.ContentFolderName!, file.FileName);

        await using FileStream fileStream = new(fullPath, FileMode.Create);
        await file.CopyToAsync(fileStream);

        return file.FileName;
    }

    public void DeleteFile(string fullPath)
    {
        File.Delete(fullPath);
    }
}