namespace Core.Entities.Base;

public abstract class Entity<T> : IUpdatable<T> where T : Entity<T>
{
    public Guid Id { get; set; }
    public abstract void Update(T entity);
}