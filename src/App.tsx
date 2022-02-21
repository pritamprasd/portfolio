import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';
import AppHeader from './header/AppHeader';
import BodyContent from './body/BodyContent';
import SideBar from './sidebar/SideBar';
import { url } from 'inspector';
import './index.css'

function App() {
  const [opened, setOpened] = useState(false);
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
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', flexDirection:'row' , justifyContent: 'space-between'}}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color={theme.colors.gray[6]} mr="xl"/>
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
