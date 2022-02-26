import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';
import AppHeader from './header/AppHeader';
import BodyContent from './body/BodyContent';
import SideBar from './sidebar/SideBar';
import { url } from 'inspector';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { toogleNavbar } from './sidebar/navbarSlice';

function App() {
  const opened = useSelector((state: RootState) => state.navbar.opened);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState('default');
  const theme = useMantineTheme();

  return (
    <AppShell navbarOffsetBreakpoint="sm" fixed
      navbar={
        <Navbar padding="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 220, lg: 250 }}>
            <SideBar activePage={activePage} clickedPage={(pageName:string)=> setActivePage(pageName)}/>
        </Navbar>
      }
      header={
        <Header height={70} padding="md" className='app-header'>
          <div style={{ display: 'flex', height: '100%', flexDirection:'row' , justifyContent: 'flex-start', alignItems: 'center'}}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={opened} onClick={() => dispatch(toogleNavbar())} size="sm" color={theme.colors.gray[6]} mr="xl"/>
            </MediaQuery>
            <AppHeader opened={!opened}/>            
          </div>          
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        body: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <BodyContent activePage={activePage}/>
    </AppShell>
    
  );
}


export default App;
