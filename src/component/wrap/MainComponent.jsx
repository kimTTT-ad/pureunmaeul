import React from 'react';
import Section1Component from './main/Section1Component';
import Section2Component from './main/Section2Component';
import Section3Component from './main/Section3Component';

export default function MainComponent() {
    return (
        <main id="main">
            <Section1Component />
            <Section2Component />
            <Section3Component />
        </main>
    );
}