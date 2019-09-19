import React from 'react'
import Page from '../Page/Page'

import Filterbox from '../Filtering/Filterbox'
import Searchbox from '../Filtering/Searchbox'

export default class Players extends React.Component
{
	render()
	{
		return (
			<Page title="Players">
				<Filterbox>
					<Searchbox placeholder="Search Players...">

					</Searchbox>
				</Filterbox>
			</Page>
		);
	}
}