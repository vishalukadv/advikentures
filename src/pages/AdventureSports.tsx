import React from 'react';
import SectionTitle from '../components/SectionTitle';
import AdventureCategory from '../components/adventure/AdventureCategory';
import { adventureCategories } from '../data/adventureActivities';
import { comboPlans } from '../data/comboPlans';

const AdventureSports = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Adventure Sports"
            subtitle="Choose your thrill level from our range of exciting activities"
          />
          
          {adventureCategories.map((category) => (
            <AdventureCategory
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              activities={category.activities}
            />
          ))}

          <div className="mt-16 bg-orange-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Combo Plans</h3>
            <p className="text-gray-600 mb-6">
              Get more adventure for less with our specially curated combo packages. 
              Mix and match activities from different categories for the ultimate adventure experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comboPlans.map((plan) => (
                <div key={plan.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold">{plan.title}</h4>
                    {plan.tag && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                        {plan.tag}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.activities.map((activity) => (
                      <li key={activity} className="flex items-center">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Duration: {plan.duration}</p>
                    <p>Includes: {plan.includes}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdventureSports;