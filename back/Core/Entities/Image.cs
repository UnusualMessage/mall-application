using Core.Entities.Base;

namespace Core.Entities;

public class Image : Entity, IUpdatable<Image>
{
    public string Path { get; set; } = string.Empty;

    public IEnumerable<Shop> ShopsWithLogos { get; set; } = new List<Shop>();
    public ICollection<Shop> ShopsWithGallery { get; set; } = new List<Shop>();

    public void Update(Image entity)
    {
        Path = entity.Path;
    }
}