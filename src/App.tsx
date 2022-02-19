import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';
import AppHeader from './header/AppHeader';

function App() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 250, lg: 300 }}
        >
          <Text>Application navbar</Text>
          <Text>Application navbar</Text>
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} padding="md">
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', flexDirection:'row' , justifyContent: 'space-between'}}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <AppHeader  opened={!opened}/>
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}


export default App;
