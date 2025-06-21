import AmbassadorForm from './components/AmbassadorForm';
import CareerForm from './components/CareerForm';
import InternshipApplication from './components/InternshipApplication';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Internexis Official - Form Testing
        </h1>
        
        <div className="space-y-16">
          {/* Ambassador Form */}
          <section>
            <AmbassadorForm />
          </section>
          
          {/* Career Form */}
          <section>
            <CareerForm />
          </section>
          
          {/* Internship Form */}
          <section>
            <InternshipApplication />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
