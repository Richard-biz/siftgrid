namespace MyStateful
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using MyClassLibrary.Interface;

    public partial class SiftgridDataContext : DbContext
    {
        public SiftgridDataContext()
            : base("name=SiftgridDataContext")
        {
        }
        public DbSet<User> users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
