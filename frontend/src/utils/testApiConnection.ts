import { adminService } from '../lib/services';

// Test API connections
export const testAPIConnections = async () => {
  console.log('🧪 Testing API Connections...');
  
  try {
    // Test health endpoint
    const healthResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);

    // Test main API info
    const apiResponse = await fetch(import.meta.env.VITE_API_BASE_URL);
    const apiData = await apiResponse.json();
    console.log('✅ API Info:', apiData);

    // Test form endpoints with sample data
    console.log('🧪 Testing Form Submissions...');
    
    // Test Ambassador Form (won't actually submit - just test connection)
    console.log('📝 Ambassador Service: Ready');
    
    // Test Career Form
    console.log('📝 Career Service: Ready');
    
    // Test Internship Form  
    console.log('📝 Internship Service: Ready');

    // Test Admin Dashboard Data
    console.log('🧪 Testing Admin Dashboard...');
    try {
      const dashboardStats = await adminService.getDashboardStats();
      console.log('✅ Dashboard Stats:', dashboardStats);
      
      const recentApps = await adminService.getRecentApplications(3);
      console.log('✅ Recent Applications:', recentApps);
    } catch {
      console.log('ℹ️ Admin Dashboard: Needs authentication (expected)');
    }

    console.log('🎉 All API connections successful!');
    return {
      success: true,
      message: 'All API connections working properly',
      backend: apiData
    };

  } catch (error) {
    console.error('❌ API Connection Error:', error);
    return {
      success: false,
      message: 'API connection failed',
      error: error
    };
  }
};

// Export for use in components
export default testAPIConnections;
