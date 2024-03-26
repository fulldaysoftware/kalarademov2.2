import { People, Dashboard, Map, Reviews, Checklist } from "@mui/icons-material";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate} from "react-router-dom"


export default function AdminChoice({open, theme}) {
  const nav = useNavigate()
    return (
        <>
        <List>
            <ListItem key="dashboard" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <Dashboard  style = {{color: theme.palette.primary.main}} />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText  style = {{color: theme.palette.primary.main}}  primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="region" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <Map style = {{color: theme.palette.primary.main}} />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText style = {{color: theme.palette.primary.main}} primary="Region" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="heads" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <People style = {{color: theme.palette.primary.main}}/>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText style = {{color: theme.palette.primary.main}} primary="Head" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="reviewforms" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={()=>{
                
                nav("/forms")}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <Checklist style = {{color: theme.palette.primary.main}}/>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText style = {{color: theme.palette.primary.main}} primary="Forms" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="reviews" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <Reviews style = {{color: theme.palette.primary.main}} />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText style = {{color: theme.palette.primary.main}} primary="Hotel Reviews" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        </>
    )
}