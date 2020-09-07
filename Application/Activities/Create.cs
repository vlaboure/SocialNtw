using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // on ne travaille plus sur une question mais sur une commande
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
            public DateTime Date { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            // on ne travaille plus sur une question mais sur une commande
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                   Id = request.Id, 
                   Title = request.Title, 
                   Description = request.Description, 
                   Category = request.Category, 
                   City = request.City, 
                   Venue = request.Venue, 
                   Date = request.Date, 
                };
                
                _context.Activities.Add(activity);
                  
                var success = await _context.SaveChangesAsync()>0;//?Unit.Value:
                if(success) return Unit.Value;
                throw new Exception("problème durant la sauvegarde");                                  
            }
        }
    }
}