const axios = require('axios');
const fs = require('fs');

const API_BASE_URL = 'http://localhost:5000';

async function testExportEndpoints() {
  try {
    console.log('🧪 Testing Export Endpoints...\n');

    // Test CSV export for ambassadors
    console.log('1. Testing CSV Export (Ambassador Applications)...');
    try {
      const csvResponse = await axios.get(`${API_BASE_URL}/api/admin/export/ambassador?format=csv`, {
        responseType: 'stream'
      });
      
      console.log('✅ CSV export successful');
      console.log('   Content-Type:', csvResponse.headers['content-type']);
      console.log('   Content-Disposition:', csvResponse.headers['content-disposition']);
      
      // Save to file
      const csvWriter = fs.createWriteStream('test-ambassador-export.csv');
      csvResponse.data.pipe(csvWriter);
      console.log('   📁 Saved as: test-ambassador-export.csv');
    } catch (error) {
      console.error('❌ CSV export failed:', error.message);
    }

    console.log();

    // Test Excel export for careers
    console.log('2. Testing Excel Export (Career Applications)...');
    try {
      const xlsxResponse = await axios.get(`${API_BASE_URL}/api/admin/export/career?format=xlsx`, {
        responseType: 'stream'
      });
      
      console.log('✅ Excel export successful');
      console.log('   Content-Type:', xlsxResponse.headers['content-type']);
      console.log('   Content-Disposition:', xlsxResponse.headers['content-disposition']);
      
      // Save to file
      const xlsxWriter = fs.createWriteStream('test-career-export.xlsx');
      xlsxResponse.data.pipe(xlsxWriter);
      console.log('   📁 Saved as: test-career-export.xlsx');
    } catch (error) {
      console.error('❌ Excel export failed:', error.message);
    }

    console.log();

    // Test All Applications Export
    console.log('3. Testing All Applications Export...');
    try {
      const allResponse = await axios.get(`${API_BASE_URL}/api/admin/export-all`, {
        responseType: 'stream'
      });
      
      console.log('✅ All applications export successful');
      console.log('   Content-Type:', allResponse.headers['content-type']);
      console.log('   Content-Disposition:', allResponse.headers['content-disposition']);
      
      // Save to file
      const allWriter = fs.createWriteStream('test-all-applications.xlsx');
      allResponse.data.pipe(allWriter);
      console.log('   📁 Saved as: test-all-applications.xlsx');
    } catch (error) {
      console.error('❌ All applications export failed:', error.message);
    }

    console.log();
    console.log('🎉 Export endpoint testing completed!');
    console.log('📋 Check the generated files to verify export formats');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
if (require.main === module) {
  testExportEndpoints();
}

module.exports = { testExportEndpoints };
