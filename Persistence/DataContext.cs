﻿using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {            
        }
        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // pour ajouter les valeurs à la création de migration
            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "101" },
                    new Value { Id = 2, Name = "102" },
                    new Value { Id = 3, Name = "103" }
                );
        }
    }
}
