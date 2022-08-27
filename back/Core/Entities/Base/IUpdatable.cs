namespace Core.Entities.Base;

public interface IUpdatable<in T> where T : Entity<T>
{
    public void Update(T entity);
}