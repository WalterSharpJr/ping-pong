import React from 'react'
import Page from '../Page/Page'

import Filterbox from '../Filtering/Filterbox'
import Searchbox from '../Filtering/Searchbox'

export default class Games extends React.Component
{
	render()
	{
		return (
			<Page title="Games">
				<Filterbox>
					<Searchbox placeholder="Search...">

					</Searchbox>
				</Filterbox>
			</Page>
		);
	}
}