import React, {useState, useEffect, useCallback, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
// import Table from '../../components/UI/Table/Table';
import TableUser from '../../components/UI/Table/ReactTable/TableUser/TableUser';
import {crudUserHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import Heading from '../../components/CRUD/Customer/Heading';
import {AuthContext} from '../../context/auth-context';

const Users = props => {   
    

    const users = useSelector(state => {
        return state.user.users;
    });    
    
    const usersCount = useSelector(state => {
        return state.user.usersCount;
    });
    const loading = useSelector(state => {
        return state.user.usersLoading;
    });
    const offset = useSelector(state => {
        return state.user.usersOffset;
    });
    const limit = useSelector(state => {
        return state.user.usersLimit;
    });
    const page = useSelector(state => {
        return state.user.usersPage;
    });   
           
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[role, setRole] = useState('');
    const[name, setName] = useState('');
    const[surname, setSurname]= useState('');
    const[email, setEmail]=useState('');
    const[company, setCompany]=useState('');
    const[terms, setTerms]=useState('');
    
    const dispatch = useDispatch();

    const authContext = useContext(AuthContext);
    let isAuthenticated = authContext.user.token;

        console.log("TOLKEN="+isAuthenticated);
    
    const onFetchUsers = useCallback(
        () => dispatch(actions.fetchUsers(offset, limit, username, password, role, name, surname, email, company, terms, isAuthenticated ))
        , [dispatch, offset, limit, username, password, role, name, surname, email, company, terms, isAuthenticated]
    );
    
    

    const onSetUsersOffsetLimit = (offset, limit) => dispatch(actions.setUsersOffsetLimit(offset, limit));    
    const onSetUsersPage = (page) => dispatch(actions.setUsersPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetUsersOffsetLimit(tableOffset, tableLimit);   
    };
    const setUsersPageHandler = page => {                
        onSetUsersPage(page);
    };      
         
       
    useEffect(() => { 
        onFetchUsers();
        
    }, [onFetchUsers]);     
     
    
    let usersTable = <Spinner />;
    if (!users && !loading  ) {
        usersTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read users from the server!</p>;
    }
    
    if (users && !loading ) {
        // usersTable = <Table 
        //     data={users}
        //     header={crudUserHeader}            
        //     rowsPerPageDef={limit}
        //     changeOffsetOrLimit={changeOffsetOrLimitHandler}
        //     totalDataCount={usersCount}
        //     setPageStore={setUsersPageHandler}
        //     currPage={page}                        
        //     /> ;  
        usersTable = <TableUser
            data={users}            
            rowsPerPageDef={limit}            
            totalDataCount={usersCount}
            currPage={page}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            setPageStore={setUsersPageHandler}   
             
        />;      
    }      
    
    return (
        <React.Fragment>    
            <Heading/>                                                
            {usersTable}            
        </React.Fragment>        
    );
};

export default withErrorHandler(Users, axios);