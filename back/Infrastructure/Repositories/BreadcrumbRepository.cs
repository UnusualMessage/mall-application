using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class BreadcrumbRepository : Repository<Breadcrumb>, IBreadcrumbRepository
{
    public BreadcrumbRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }
}