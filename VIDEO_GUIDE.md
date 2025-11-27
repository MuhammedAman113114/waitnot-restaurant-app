# Video Upload Guide for Reels

## Problem: "Request failed with status code 413"

This error means your video file is too large to upload directly. Here are your options:

## Solution 1: Use Video URL (Recommended) ⭐

### Option A: YouTube (Best for public videos)

1. **Upload to YouTube:**
   - Go to https://youtube.com
   - Click "Create" → "Upload video"
   - Upload your video
   - Set visibility to "Unlisted" (not private!)

2. **Get Direct Video URL:**
   - Use a YouTube video downloader to get the direct MP4 URL
   - Or use: https://yt1s.com/en/youtube-to-mp4
   - Copy the MP4 download link (don't download, just copy the link)

3. **Paste in WaitNot:**
   - Select "Video URL" option
   - Paste the direct MP4 link
   - Submit

### Option B: Google Drive

1. **Upload to Google Drive:**
   - Go to https://drive.google.com
   - Upload your video
   - Right-click → "Get link"
   - Change to "Anyone with the link"

2. **Get Direct Link:**
   - Copy the file ID from the link
   - Format: `https://drive.google.com/uc?export=download&id=FILE_ID`
   - Replace FILE_ID with your actual ID

3. **Use in WaitNot:**
   - Select "Video URL"
   - Paste the formatted link

### Option C: Cloudinary (Free tier available)

1. **Sign up:** https://cloudinary.com
2. **Upload video** to your media library
3. **Copy the video URL**
4. **Paste in WaitNot**

### Option D: Vimeo

1. **Upload to Vimeo:** https://vimeo.com
2. **Get video URL**
3. **Use in WaitNot**

## Solution 2: Compress Your Video

If you want to upload directly, compress your video first:

### Online Compressors (Free):

1. **FreeConvert:** https://www.freeconvert.com/video-compressor
   - Upload video
   - Set quality to 50-70%
   - Download compressed version

2. **Clideo:** https://clideo.com/compress-video
   - Upload video
   - Auto-compress
   - Download

3. **VideoSmaller:** https://www.videosmaller.com
   - Upload video
   - Choose compression level
   - Download

### Desktop Tools:

**HandBrake (Free):**
- Download: https://handbrake.fr
- Open video
- Preset: "Fast 480p30" or "Fast 720p30"
- Start encode

**FFmpeg (Command line):**
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 500k output.mp4
```

## Solution 3: Record Shorter Videos

- Keep reels under 15 seconds
- This naturally keeps file size small
- Better for user engagement anyway!

## Recommended Workflow:

### For Best Results:

1. **Record video on phone** (portrait mode, 9:16 ratio)
2. **Keep it short** (10-15 seconds)
3. **Upload to YouTube** (unlisted)
4. **Get direct MP4 link** using yt1s.com
5. **Use Video URL option** in WaitNot
6. **Submit!**

### Why This Works:

✅ No file size limits
✅ Fast loading for users
✅ Professional video hosting
✅ Better performance
✅ Videos don't expire

## File Size Limits:

- **Direct Upload:** 5MB max
- **Video URL:** No limit (hosted elsewhere)

## Video Requirements:

- **Format:** MP4, WebM, MOV
- **Orientation:** Vertical (9:16 ratio)
- **Duration:** 10-30 seconds recommended
- **Quality:** 720p or 1080p

## Quick Tips:

1. **Always use Video URL for videos > 5MB**
2. **Compress videos before uploading**
3. **Keep reels short and engaging**
4. **Test the video URL before submitting**
5. **Use portrait orientation**

## Example Video URLs:

Good URLs (direct video links):
```
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4
https://your-cloudinary.com/video/upload/v1234567890/sample.mp4
```

Bad URLs (not direct links):
```
https://youtube.com/watch?v=abc123  ❌
https://vimeo.com/123456789  ❌
https://drive.google.com/file/d/abc/view  ❌
```

## Need Help?

If you're still having issues:
1. Check the video file size (should be < 5MB for upload)
2. Try the Video URL option instead
3. Compress your video
4. Use a shorter video clip

The Video URL option is the best solution for professional use!
