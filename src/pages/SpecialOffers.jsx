import PageHero from '../components/PageHero';
import FoodCard from '../components/FoodCard';
import { useFoods } from '../context/FoodContext';

export default function SpecialOffers() {
  const { foods } = useFoods();
  const offers = foods.filter((f) => f.specialOffer);

  return (
    <div>
      <PageHero title="Special Offers" subtitle="Limited-time deals on your favorite dishes" breadcrumb="Offers" />

      <section className="section-padding" style={{ background: 'var(--section-reservation)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge badge-danger" style={{ fontSize: '1rem', padding: '8px 20px' }}>🔥 Hot Deals</div>
            <h2 style={{ marginTop: '16px' }}>Save Big on Delicious Meals</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Take advantage of our special offers and enjoy premium dining at unbeatable prices.</p>
          </div>
          <div className="grid-4">
            {offers.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
