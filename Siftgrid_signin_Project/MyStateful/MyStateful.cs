using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Data.Collections;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using MyClassLibrary.Interface;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;

namespace MyStateful
{
    /// <summary>
    /// An instance of this class is created for each service replica by the Service Fabric runtime.
    /// </summary>
    internal sealed class MyStateful : StatefulService,IUser
    {
        public MyStateful(StatefulServiceContext context)
            : base(context)
        { }

        private readonly CancellationToken cancellationToken;
        public async Task<IEnumerable<User>> GetUser()
        {
            List<User> userlist = new List<User>();
            List<User> userset = new List<User>();
            List<User> usertable = null;
            using (SiftgridDataContext ctx = new SiftgridDataContext())
            {
                usertable = ctx.users.ToList();
                foreach (var user in usertable)
                {
                    User userrecord = new User()
                    { id = user.id, tennatid = user.tennatid, company = user.company, email = user.email, password = user.password };
                    userlist.Add(userrecord);
                }
            }
            try
            {
                IReliableDictionary<string, User> myDictionary = await StateManager.GetOrAddAsync<IReliableDictionary<string, User>>("MyDectionary");
                using (var tx = this.StateManager.CreateTransaction())
                {
                    //var empy;
                    foreach (User user in userlist)
                    {

                        await myDictionary.AddOrUpdateAsync(tx, user.id, user, (key, value) => value);
                        Microsoft.ServiceFabric.Data.ConditionalValue<User> _user = await myDictionary.TryGetValueAsync(tx, user.id);
                        var result = await myDictionary.TryGetValueAsync(tx, user.id);
                        ServiceEventSource.Current.ServiceMessage(this, "myDictionary GettAlldata Current {0}", result.HasValue ? result.Value.id + " , " + result.Value.tennatid + " , " + result.Value.company + " , " + result.Value.email + " , " + result.Value.password : "Value does not exist.");
                        User users = new User()
                        { id = _user.Value.id, tennatid = _user.Value.tennatid, company = _user.Value.company, email = _user.Value.email, password = _user.Value.password };
                        userset.Add(users);

                    }
                    await tx.CommitAsync();

                }
            }
            catch (Exception ex)
            {
                throw new Exception("Connection errot"+ex.Message);
            }
            return userset;


        }


        public async Task<User> GetUserID(string id)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var GetIdDictonary = await StateManager.GetOrAddAsync<IReliableDictionary<string, User>>("GetIdDictonary");

            using (var tx = this.StateManager.CreateTransaction())
            {
                User userrecord = null;
                using (SiftgridDataContext ctx = new SiftgridDataContext())
                {
                    var record = from GetIdrecord in ctx.users where GetIdrecord.tennatid == id select GetIdrecord;
                    foreach (var user in record)
                    {
                        userrecord = new User()
                        { id = user.id, tennatid = user.tennatid, company = user.company, email = user.email, password = user.password };
                    }
                }
                //   return await Task.FromResult(userrecord);

                if (userrecord != null)
                {
                    await GetIdDictonary.ClearAsync();
                    var result = await GetIdDictonary.TryGetValueAsync(tx, userrecord.id);
                    ServiceEventSource.Current.ServiceMessage(this, "GetIdDictonary Current {0}", result.HasValue ? result.Value.id + " , " + result.Value.tennatid + " , " + result.Value.company + " , " + result.Value.email + " , " + result.Value.password : "Value does not exist.");

                    await GetIdDictonary.AddOrUpdateAsync(tx, userrecord.id, userrecord, (key, value) => value);
                    Microsoft.ServiceFabric.Data.ConditionalValue<User> user = await GetIdDictonary.TryGetValueAsync(tx, userrecord.id);
                    User _user = new User()
                    { id = user.Value.id, tennatid = user.Value.tennatid, company = user.Value.company, email = user.Value.email, password = user.Value.password };
                    await tx.CommitAsync();
                    return _user;
                }
                else
                {
                    return null;
                }
            }
           

        }


        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners()
        {
            return new List<ServiceReplicaListener>()
           {
                 new ServiceReplicaListener((context) => this.CreateServiceRemotingListener(context))
           };
        }

        /// <summary>
        /// This is the main entry point for your service replica.
        /// This method executes when this replica of your service becomes primary and has write status.
        /// </summary>
        /// <param name="cancellationToken">Canceled when Service Fabric needs to shut down this service replica.</param>
        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            // TODO: Replace the following sample code with your own logic 
            //       or remove this RunAsync override if it's not needed in your service.

            //var myDictionary = await this.StateManager.GetOrAddAsync<IReliableDictionary<string, long>>("myDictionary");

            //while (true)
            //{
            //    cancellationToken.ThrowIfCancellationRequested();

            //    using (var tx = this.StateManager.CreateTransaction())
            //    {
            //        var result = await myDictionary.TryGetValueAsync(tx, "Counter");

            //        ServiceEventSource.Current.ServiceMessage(this, "Current Counter Value: {0}",
            //            result.HasValue ? result.Value.ToString() : "Value does not exist.");

            //        await myDictionary.AddOrUpdateAsync(tx, "Counter", 0, (key, value) => ++value);

            //        // If an exception is thrown before calling CommitAsync, the transaction aborts, all changes are 
            //        // discarded, and nothing is saved to the secondary replicas.
            //        await tx.CommitAsync();
            //    }

            //    await Task.Delay(TimeSpan.FromSeconds(1), cancellationToken);
            //}
            await Task.Factory.StartNew(this.GetUser, this.cancellationToken);
        }
    }
}
