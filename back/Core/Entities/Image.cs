using Core.Entities.Base;

namespace Core.Entities;

public class Image : Entity<Image>
{
    public string Path { get; set; } = string.Empty;

    public IEnumerable<Shop> ShopsWithLogos { get; } = new List<Shop>();
    public IEnumerable<Shop> ShopsWithGallery { get; } = new List<Shop>();

    public override void Update(Image entity)
    {
        Path = entity.Path;
    }
}