namespace Core.Entities.Base;

public interface IUpdatable<in T> where T : Entity
{
    public void Update(T entity);
}