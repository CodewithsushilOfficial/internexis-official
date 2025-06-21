const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'http://localhost:5000/api';

// Test the export functionality
async function testExportFeature() {
    console.log('🧪 Testing Export Feature...\n');

    try {
        // Test 1: Check API health
        console.log('1️⃣ Testing API health...');
        const healthResponse = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`);
        console.log('✅ API Health:', healthResponse.data);

        // Test 2: Test individual exports
        const exportTypes = ['ambassador', 'career', 'internship'];
        const formats = ['xlsx', 'csv'];

        for (const type of exportTypes) {
            for (const format of formats) {
                console.log(`\n2️⃣ Testing ${type} export in ${format} format...`);
                try {
                    const response = await axios.get(`${API_BASE_URL}/admin/export/${type}?format=${format}`, {
                        responseType: 'arraybuffer',
                        headers: {
                            'Accept': format === 'xlsx' ? 
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 
                                'text/csv'
                        }
                    });

                    const filename = `test-export-${type}.${format}`;
                    const outputPath = path.join(__dirname, 'test-exports', filename);
                    
                    // Create directory if it doesn't exist
                    if (!fs.existsSync(path.dirname(outputPath))) {
                        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
                    }

                    fs.writeFileSync(outputPath, Buffer.from(response.data));
                    console.log(`✅ ${type} (${format}) exported successfully - ${response.data.byteLength} bytes`);
                    console.log(`   File saved: ${outputPath}`);
                } catch (error) {
                    console.log(`❌ ${type} (${format}) export failed:`, error.message);
                }
            }
        }

        // Test 3: Test export all
        console.log(`\n3️⃣ Testing export all data...`);
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/export-all`, {
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            });

            const filename = 'test-export-all.xlsx';
            const outputPath = path.join(__dirname, 'test-exports', filename);
            
            if (!fs.existsSync(path.dirname(outputPath))) {
                fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            }

            fs.writeFileSync(outputPath, Buffer.from(response.data));
            console.log(`✅ All data exported successfully - ${response.data.byteLength} bytes`);
            console.log(`   File saved: ${outputPath}`);
        } catch (error) {
            console.log(`❌ Export all failed:`, error.message);
        }

        // Test 4: Verify files can be opened (basic check)
        console.log(`\n4️⃣ Verifying exported files...`);
        const testDir = path.join(__dirname, 'test-exports');
        if (fs.existsSync(testDir)) {
            const files = fs.readdirSync(testDir);
            console.log('📁 Generated files:');
            files.forEach(file => {
                const filePath = path.join(testDir, file);
                const stats = fs.statSync(filePath);
                console.log(`   - ${file}: ${stats.size} bytes (${stats.isFile() ? 'valid' : 'invalid'})`);
            });
        }

        console.log('\n🎉 Export feature testing completed!');
        return true;

    } catch (error) {
        console.error('\n❌ Export feature test failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        return false;
    }
}

// Run the test
if (require.main === module) {
    testExportFeature().then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = { testExportFeature };
