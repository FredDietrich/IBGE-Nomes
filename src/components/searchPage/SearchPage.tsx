import { Avatar, Button, Checkbox, Divider, FormControlLabel, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import React from 'react';
import { getNameInfo, IBasicNameInfo } from '../../services/nameService';
import SearchContainer from '../searchContainer/SearchContainer';
import './SearchPage.css'
import BarChartIcon from '@mui/icons-material/BarChart';
import PercentIcon from '@mui/icons-material/Percent';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarsIcon from '@mui/icons-material/Stars';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BadgeIcon from '@mui/icons-material/Badge';

interface INameInputProps {
	name: String,
	setName(newName: string): void;
}

function NameInput(props: INameInputProps) {
	return (
		<TextField
			label="Digite um nome"
			value={props.name}
			fullWidth
			onChange={e => props.setName(e.target.value)}
		/>
	)
}

function BasicNameData(props: IBasicNameInfo) {
	return (
		<div className="BasicNameData">
			<List
				sx={{
					width: '100%',
					maxWidth: 360,
					backgroundColor: 'rgb(50, 66, 168, 0.3)',
					borderRadius: '25px'
				}}
			>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<BadgeIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Nome encontrado" secondary={props.nome} />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<BarChartIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Frequência no Brasil" secondary={props.freq + ' Pessoas'} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PercentIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Porcentagem no Brasil" secondary={props.percentual.toFixed(2) + '%'} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<MilitaryTechIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Ranking no Brasil" secondary={props.rank + 'º'} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<StarsIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Estado com maior índice" secondary={`${props.ufMax} (${Number.parseFloat(props.ufMaxProp).toFixed(2)} a cada 100.000 habitantes)`} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<SwapHorizIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Nomes similares incluídos na estatística" secondary={props.nomes.replaceAll(",", ", ")} />
				</ListItem>
			</List>
		</div>
	)
}

function SearchPage() {

	const [name, setName] = React.useState<String>("")
	const [basicNameData, setBasicNameData] = React.useState<IBasicNameInfo | null>(null);

	const [useBasicData, setUseBasicData] = React.useState<boolean>(true);

	function handleSearch(): void {
		if (useBasicData) {
			getNameInfo(name).then(nameInfo => {
				setBasicNameData(nameInfo[0]);
			})
		}

	}

	return (
		<div className="App">
			<SearchContainer>
				<Typography
					component={"h1"}
					style={{
						fontSize: '64px',
						color: '#52FF00',
						textAlign: 'center'
					}}>
					Buscar nome no IBGE
				</Typography>
				<NameInput name={name} setName={setName} />
				<FormControlLabel
					value={useBasicData}
					checked={useBasicData}
					onChange={(e, checked) => setUseBasicData(checked)}
					control={<Checkbox />}
					label="Dados básicos"
					labelPlacement="start"
					disabled
				/>
				<Button
					disabled={name.length < 3}
					onClick={handleSearch}
					variant="contained"
				>
					{name.length < 3 ? "Digite pelo menos três letras para buscar!" : "Buscar"}
				</Button>
				{basicNameData == null ? <></> : (
					<BasicNameData {...basicNameData} />
				)
				}
			</SearchContainer>
		</div>
	);
}

export default SearchPage;