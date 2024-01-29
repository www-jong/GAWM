import React from 'react';

import Header from './components/Header';
import Weather from './components/Weather';
import OutfitSuggestion from './components/OutfitSuggestion';
import TrendingSection from './components/TrendingSection';
import FeedSection from './components/FeedSection';
import Navigation from './components/Navigation';

export default function Browse() {
	return (
		<div className="App">
			<Header />
			<Weather />
			<OutfitSuggestion />
			<TrendingSection />
			<FeedSection />
			<Navigation />
		</div>
	);
}