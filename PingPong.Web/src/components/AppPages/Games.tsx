import React from 'react'
import Page from '../Page/Page'

import Filterbox from '../Filtering/Filterbox'
import Searchbox from '../Filtering/Searchbox'
import Filters from '../../models/Filters';
import Game from '../../viewModels/Game';
import { PageDataState } from '../../state/ApplicationState';

export default class Games extends React.Component<{ filter: Filters, games: Game[], dataState: PageDataState }>
{
	render()
	{
		return (
			<Page title="Games">
				<Filterbox>
					
				</Filterbox>
			</Page>
		);
	}
}