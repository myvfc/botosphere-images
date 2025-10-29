/ ========================================
// GOOGLE SHEET TO JSON EXPORTER
// ========================================
// This script reads your OU Sooners video Google Sheet
// and converts it to a JSON file you can host on GitHub
// 
// NO CODING KNOWLEDGE NEEDED - Just follow the instructions!
// ========================================

function exportVideosToJSON() {
  try {
    Logger.log('📤 Starting JSON export...');
    
    // Get your video sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Videos'); // Change if your sheet has different name
    
    if (!sheet) {
      Logger.log('❌ Error: Could not find "Videos" sheet');
      return;
    }
    
    // Get all video data (skip header row)
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      Logger.log('⚠️ No videos found in sheet');
      return;
    }
    
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 6); // Columns A-F
    const values = dataRange.getValues();
    
    // Convert to JSON format
    const videos = [];
    
    values.forEach(row => {
      if (row[0]) { // If title exists
        videos.push({
          title: row[0],
          url: row[1],
          channel: row[2],
          published_date: row[3],
          description: row[4],
          date_added: row[5] ? row[5].toString() : ''
        });
      }
    });
    
    // Create the JSON structure
    const jsonData = {
      last_updated: new Date().toISOString(),
      total_videos: videos.length,
      videos: videos
    };
    
    // Convert to pretty JSON string
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    // Log success
    Logger.log(`✅ Export complete! ${videos.length} videos converted`);
    Logger.log('📋 JSON is ready - see next steps below');
    Logger.log('');
    Logger.log('========================================');
    Logger.log('COPY THE JSON BELOW THIS LINE:');
    Logger.log('========================================');
    Logger.log(jsonString);
    Logger.log('========================================');
    Logger.log('STOP COPYING ABOVE THIS LINE');
    Logger.log('========================================');
    
    return jsonString;
    
  } catch (error) {
    Logger.log(`❌ Error: ${error.toString()}`);
  }
}

// ========================================
// SETUP INSTRUCTIONS (DO THIS ONCE)
// ========================================

/*

STEP 1: ADD THIS SCRIPT
1. Open your Google Sheet with the videos
2. Click "Extensions" → "Apps Script"
3. Click the + next to "Files" → "Script"
4. Name it "JSON Exporter"
5. Delete any default code
6. Paste THIS ENTIRE FILE
7. Click Save (💾 icon)

STEP 2: RUN THE EXPORT
1. Make sure "exportVideosToJSON" is selected in the function dropdown
2. Click ▶️ Run
3. Grant permissions if asked
4. Wait for it to finish (30 seconds)

STEP 3: GET YOUR JSON
1. Click "Execution log" at the bottom
2. Scroll down - you'll see your JSON between the lines
3. Copy everything between:
   "COPY THE JSON BELOW THIS LINE"
   and
   "STOP COPYING ABOVE THIS LINE"

STEP 4: PUT IT ON GITHUB
1. Go to your GitHub repository (where you host images)
2. Click "Add file" → "Create new file"
3. Name it: "ou-videos.json"
4. Paste the JSON you copied
5. Scroll down, click "Commit new file"

STEP 5: GET YOUR URL
Your videos are now at:
https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/ou-videos.json

Replace YOUR-USERNAME and YOUR-REPO with your actual info

STEP 6: GIVE THIS URL TO YOUR BOT
Your bot can now read all videos from this URL!
Every time someone asks for videos, bot loads this file.

========================================
TO UPDATE VIDEOS (Run this weekly/monthly):
========================================

1. Your scraper adds new videos to Google Sheet (automatic)
2. Run this script again (click ▶️ Run)
3. Copy the new JSON from execution log
4. Go to GitHub → ou-videos.json → Edit
5. Replace old content with new JSON
6. Commit changes
7. Bot now has updated videos!

========================================
WANT AUTOMATIC UPDATES?
========================================

We can set this up to auto-commit to GitHub daily!
But start with manual first to make sure it works.

*/

// Optional: Test with just first 10 videos
function testExportSample() {
  Logger.log('🧪 Testing with first 10 videos...');
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Videos');
  
  if (!sheet) {
    Logger.log('❌ Error: Could not find "Videos" sheet');
    return;
  }
  
  const dataRange = sheet.getRange(2, 1, 10, 6);
  const values = dataRange.getValues();
  
  const videos = [];
  values.forEach(row => {
    if (row[0]) {
      videos.push({
        title: row[0],
        url: row[1],
        channel: row[2],
        published_date: row[3],
        description: row[4]
      });
    }
  });
  
  const jsonData = {
    test: true,
    sample_size: 10,
    videos: videos
  };
  
  Logger.log(JSON.stringify(jsonData, null, 2));
  Logger.log('✅ Test complete!');
}
