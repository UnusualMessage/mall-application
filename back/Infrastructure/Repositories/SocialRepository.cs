using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class SocialRepository : Repository<Social>, ISocialRepository
{
    public SocialRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }
}