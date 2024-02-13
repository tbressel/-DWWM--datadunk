import Login from './components/subcomponents/Login';

/////////////////////////////////////////////////////////////
//////////////////   INTERFACE TYPES   //////////////////////
/////////////////////////////////////////////////////////////


const Connect = ({user}: {user: any}) => (
    <>
        <Login user={user} />
        <div>
            <h1>Connect</h1>
        </div>
    </>
);

export default Connect;
