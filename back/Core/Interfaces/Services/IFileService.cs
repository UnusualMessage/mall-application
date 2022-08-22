using Microsoft.AspNetCore.Http;

namespace Core.Interfaces.Services;

public interface IFileService
{
    public Task<string> UploadFile(IFormFile file, string destination);
    public void DeleteFile(string rootPath, string localPath);
}