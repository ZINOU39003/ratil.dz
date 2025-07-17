<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صانع كتب الأطفال الإحترافي</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Marhey:wght@400;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Cairo', sans-serif;
            background-color: #f1f5f9;
        }
        h1, h2, h3, p, div {
             font-family: 'Marhey', 'Cairo', sans-serif;
        }
        .card {
            background-color: white;
            border-radius: 24px;
            box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
        }
        .btn-primary {
            background: linear-gradient(45deg, #3b82f6, #818cf8);
            color: white;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        .btn-primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
        .btn-primary:disabled {
            background: #9ca3af;
            cursor: not-allowed;
            box-shadow: none;
        }
        .btn-secondary {
            background-color: #10b981;
            color: white;
        }
        .btn-secondary:hover:not(:disabled) {
            background-color: #059669;
        }
        .loader {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3b82f6;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        #storybook-viewer {
            /* Portrait aspect ratio for preview */
            aspect-ratio: 9 / 16;
            max-height: 60vh;
        }
        .nav-btn {
            background-color: rgba(0,0,0,0.3);
            color: white;
        }
        #character-image-preview-container {
            cursor: pointer;
            width: 128px;
            height: 128px;
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-5xl mx-auto">
        <div id="app-container" class="card p-6 md:p-10">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl md:text-5xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">صانع كتب الأطفال الإحترافي</h1>
                <p class="text-gray-500 mt-3 text-lg">حوّل حياتك إلى حكاية خالدة.</p>
            </div>

            <!-- Input Form -->
            <div id="input-section">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <!-- Character Inputs -->
                    <div class="md:col-span-1 flex flex-col items-center space-y-3 p-4 border rounded-xl bg-slate-50">
                        <label class="text-lg font-medium text-gray-700">1. صمم بطلك</label>
                        <div id="character-image-preview-container" class="border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 overflow-hidden">
                            <img id="character-image-preview" src="" class="w-full h-full object-cover hidden" alt="معاينة صورة الشخصية">
                            <span id="character-image-placeholder" class="text-center text-sm p-2">اختر صورة</span>
                        </div>
                        <input type="file" id="character-image-input" class="hidden" accept="image/*">
                        <input type="text" id="character-name" class="w-full p-2 border border-gray-300 rounded-lg text-center" placeholder="اسم البطل">
                        <input type="number" id="character-age" class="w-full p-2 border border-gray-300 rounded-lg text-center" placeholder="العمر">
                    </div>

                    <!-- Story Details -->
                    <div class="md:col-span-2 space-y-4">
                        <div>
                            <label for="character-interests" class="block text-lg font-medium text-gray-700 mb-2">2. ما هي اهتمامات البطل؟</label>
                             <textarea id="character-interests" rows="2" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="مثال: يحب الديناصورات، استكشاف الفضاء، ورسم اللوحات الملونة"></textarea>
                        </div>
                        <div>
                            <label for="story-summary" class="block text-lg font-medium text-gray-700 mb-2">3. اكتب ملخصاً للقصة</label>
                            <textarea id="story-summary" rows="2" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="مثال: مغامرة سالم في البحث عن الكنز المفقود في حديقة جدته."></textarea>
                        </div>
                        <div>
                            <label for="dedication" class="block text-lg font-medium text-gray-700 mb-2">4. اكتب إهداءً (اختياري)</label>
                            <input type="text" id="dedication" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="مثال: إلى ابني الغالي، نور حياتي">
                        </div>
                        <div>
                            <label for="page-count" class="block text-lg font-medium text-gray-700 mb-2">5. حدد عدد المشاهد في القصة</label>
                            <input type="number" id="page-count" class="w-full p-3 border border-gray-300 rounded-lg" value="4" min="2" max="6">
                        </div>
                    </div>
                </div>
                <div class="mt-8 text-center">
                    <button id="generate-btn" class="btn-primary font-bold py-3 px-12 rounded-full text-xl shadow-lg transform hover:scale-105">
                        🚀 أنشئ كتابي
                    </button>
                </div>
            </div>

            <!-- Loading Section -->
            <div id="loading-section" class="text-center py-16 hidden">
                <div class="loader mx-auto"></div>
                <p id="loading-status" class="text-gray-600 mt-4 text-lg font-semibold">جاري تحليل الفكرة...</p>
            </div>

            <!-- Storybook Output Section -->
            <div id="storybook-section" class="hidden">
                 <div id="storybook-viewer" class="w-full max-w-xs mx-auto bg-gray-200 rounded-lg shadow-inner border p-2 relative">
                    <!-- This will be populated by JS -->
                 </div>
                 <p id="page-indicator" class="text-center text-gray-500 mt-4"></p>
                 <div class="mt-6 text-center space-x-4 rtl:space-x-reverse">
                    <button id="reset-btn" class="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300">إنشاء قصة جديدة</button>
                    <button id="download-pdf-btn" class="btn-secondary font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105">
                        📥 تحميل PDF
                    </button>
                 </div>
            </div>
        </div>
    </div>
    
    <!-- PDF Generation Container (Hidden) -->
    <div id="pdf-render-container" class="fixed -top-[9999px] -left-[9999px]"></div>

    <script>
        // DOM Elements
        const inputSection = document.getElementById('input-section');
        const loadingSection = document.getElementById('loading-section');
        const loadingStatus = document.getElementById('loading-status');
        const storybookSection = document.getElementById('storybook-section');
        const storybookViewer = document.getElementById('storybook-viewer');
        const generateBtn = document.getElementById('generate-btn');
        const resetBtn = document.getElementById('reset-btn');
        const downloadPdfBtn = document.getElementById('download-pdf-btn');

        // Character Inputs
        let characterImageBase64 = null;
        let characterImageURL = null;

        // Story Data
        let bookData = [];
        let currentPageIndex = 0;

        // Event Listeners
        document.getElementById('character-image-preview-container').addEventListener('click', () => document.getElementById('character-image-input').click());
        document.getElementById('character-image-input').addEventListener('change', handleCharacterImageUpload);
        generateBtn.addEventListener('click', handleStorybookGeneration);
        resetBtn.addEventListener('click', resetView);
        downloadPdfBtn.addEventListener('click', downloadAsPDF);

        function handleCharacterImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    characterImageURL = e.target.result;
                    document.getElementById('character-image-preview').src = characterImageURL;
                    document.getElementById('character-image-preview').classList.remove('hidden');
                    document.getElementById('character-image-placeholder').classList.add('hidden');
                    characterImageBase64 = e.target.result.split(',')[1];
                };
                reader.readAsDataURL(file);
            }
        }

        async function handleStorybookGeneration() {
            const characterName = document.getElementById('character-name').value.trim();
            const characterAge = document.getElementById('character-age').value.trim();
            const characterInterests = document.getElementById('character-interests').value.trim();
            const summary = document.getElementById('story-summary').value.trim();
            const dedication = document.getElementById('dedication').value.trim();
            const pageCount = document.getElementById('page-count').value;

            if (!characterName || !summary || !characterImageBase64 || !characterAge || !characterInterests) {
                alert('الرجاء تعبئة جميع الحقول: الصورة، الاسم، العمر، الاهتمامات، وملخص القصة.');
                return;
            }

            generateBtn.disabled = true;
            inputSection.classList.add('hidden');
            loadingSection.classList.remove('hidden');
            storybookSection.classList.add('hidden');

            try {
                loadingStatus.textContent = 'بناء هيكل القصة...';
                const structure = await generateStoryStructure(summary, characterName, characterAge, characterInterests, pageCount);
                
                let generatedBookData = [];

                loadingStatus.textContent = 'تصميم الغلاف...';
                const coverImageUrl = await generateImage(structure.cover_image_prompt);
                generatedBookData.push({ type: 'cover', title: structure.title, imageUrl: coverImageUrl, characterName });

                if (dedication) {
                    generatedBookData.push({ type: 'dedication', text: dedication });
                }

                loadingStatus.textContent = 'رسم شخصيتك الكرتونية...';
                const introImageUrl = await generateImage(structure.character_intro_image_prompt);
                generatedBookData.push({ type: 'introduction', text: structure.character_introduction, imageUrl: introImageUrl, realImageUrl: characterImageURL });
                
                let realisticImageUrls = [];
                for (let i = 0; i < structure.pages.length; i++) {
                    loadingStatus.textContent = `تصوير المشهد الواقعي ${i + 1}...`;
                    const page = structure.pages[i];
                    const realisticImageUrl = await generateImage(page.image_prompt_realistic);
                    realisticImageUrls.push(realisticImageUrl);
                }

                for (let i = 0; i < structure.pages.length; i++) {
                    loadingStatus.textContent = `رسم المشهد الكرتوني ${i + 1}...`;
                    const page = structure.pages[i];
                    const cartoonImageUrl = await generateImage(page.image_prompt_cartoon);
                    
                    generatedBookData.push({ type: 'story_image', imageUrl: cartoonImageUrl });
                    generatedBookData.push({ type: 'story_text', text: page.page_text, realisticImageUrl: realisticImageUrls[i] });
                }

                generatedBookData.push({ type: 'conclusion', text: structure.conclusion });
                
                bookData = generatedBookData;
                currentPageIndex = 0;
                displayCurrentPage();

                loadingSection.classList.add('hidden');
                storybookSection.classList.remove('hidden');

            } catch (error) {
                console.error('Error generating storybook:', error);
                loadingSection.classList.add('hidden');
                inputSection.classList.remove('hidden');
                alert(`حدث خطأ فادح: ${error.message}`);
            } finally {
                generateBtn.disabled = false;
            }
        }

        async function generateStoryStructure(summary, characterName, age, interests, sceneCount) {
            const prompt = `
                You are an expert children's book author and artistic director. Create a complete, structured children's book in PORTRAIT format.
                The output MUST be a single valid JSON object.

                USER REQUEST:
                - Character Name: ${characterName}
                - Age: ${age}
                - Interests: ${interests}
                - Story Summary: A story about ${characterName} who ${summary}.
                - Number of scenes: ${sceneCount}

                YOUR TASK:
                1. Analyze the character in the provided image. Create a detailed description (gender, hair, clothing, etc.).
                2. Generate a complete book structure:
                   - "title": A captivating title in Arabic.
                   - "cover_image_prompt": A prompt for a PORTRAIT (9:16) book cover featuring a CARTOON version of the character. Style: "Enchanting children's book cover illustration".
                   - "character_introduction": A warm introduction in Arabic, using the character's name, age, and interests.
                   - "character_intro_image_prompt": A prompt for a full-body CARTOON version of the character with a transparent background. Style: "Clean character concept art, children's book style".
                   - "pages": An array of EXACTLY ${sceneCount} objects. Each object must have:
                       - "page_text": A long, realistic paragraph of the story in Arabic (at least 60 words).
                       - "image_prompt_cartoon": A prompt for a FULL-PAGE, PORTRAIT (9:16) CARTOON illustration for this scene. It MUST include the full character description for consistency.
                       - "image_prompt_realistic": A prompt for a PHOTOREALISTIC image of the character in the same scene. This should look like a real photo. It MUST include the full character description. Emphasize realism: "photorealistic, 4k, detailed photo, high quality".
                   - "conclusion": A heartwarming concluding paragraph in Arabic.
            `;

            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const payload = {
                contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'image/jpeg', data: characterImageBase64 } }] }],
                generationConfig: { responseMimeType: "application/json", temperature: 0.8 }
            };
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`Gemini API failed: ${response.status}`);
            const result = await response.json();
             if (!result.candidates || result.candidates.length === 0) {
                 console.error("API Response:", result);
                 let errorMessage = 'فشل إنشاء القصة. قد يكون الطلب قد تم حظره.';
                 if (result.promptFeedback && result.promptFeedback.blockReason) {
                     errorMessage += ` السبب: ${result.promptFeedback.blockReason}`;
                 }
                 throw new Error(errorMessage);
            }
            const jsonText = result.candidates[0].content.parts[0].text;
            return JSON.parse(jsonText);
        }

        async function generateImage(prompt, aspectRatio = "9:16") {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
            const payload = { instances: [{ prompt: prompt }], parameters: { "sampleCount": 1, "aspectRatio": aspectRatio } };
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`Imagen API failed: ${response.status}`);
            const result = await response.json();
            if (result.predictions && result.predictions[0].bytesBase64Encoded) {
                return `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
            }
            throw new Error('Failed to generate image.');
        }

        function displayCurrentPage() {
            if (!bookData || bookData.length === 0) return;
            const page = bookData[currentPageIndex];
            let content = '';

            const navButtons = `
                <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-1">
                    <button onclick="navigatePage(-1)" class="nav-btn rounded-full w-8 h-8 flex items-center justify-center" ${currentPageIndex === 0 ? 'disabled' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button onclick="navigatePage(1)" class="nav-btn rounded-full w-8 h-8 flex items-center justify-center" ${currentPageIndex === bookData.length - 1 ? 'disabled' : ''}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>`;

            switch (page.type) {
                case 'cover':
                    content = `<div class="relative w-full h-full"><img src="${page.imageUrl}" class="w-full h-full object-cover rounded-lg"><div class="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4"><h2 class="text-white text-3xl font-bold">${page.title}</h2><p class="text-white text-xl mt-2">قصة بطولة: ${page.characterName}</p></div>${navButtons}</div>`;
                    break;
                case 'dedication':
                case 'conclusion':
                    content = `<div class="relative w-full h-full flex items-center justify-center bg-white rounded-lg p-8"><p class="text-xl text-center text-gray-700 italic">"${page.text}"</p>${navButtons}</div>`;
                    break;
                case 'introduction':
                    content = `<div class="relative w-full h-full flex flex-col items-center justify-center gap-4 bg-white rounded-lg p-4">
                                    <img src="${page.realImageUrl}" class="rounded-full object-cover w-24 h-24 border-2 border-blue-300">
                                    <img src="${page.imageUrl}" class="object-contain h-40">
                                    <p class="text-center text-gray-700 p-2 bg-gray-100 rounded-md">${page.text}</p>
                                    ${navButtons}
                               </div>`;
                    break;
                case 'story_image':
                    content = `<div class="relative w-full h-full"><img src="${page.imageUrl}" class="w-full h-full object-cover rounded-lg">${navButtons}</div>`;
                    break;
                case 'story_text':
                    content = `<div class="relative w-full h-full flex items-center justify-center bg-gray-100 rounded-lg p-8">
                                    <img src="${page.realisticImageUrl}" class="absolute top-4 right-4 w-24 h-auto rounded-lg shadow-lg border-2 border-white transform rotate-6">
                                    <p class="text-lg text-center text-gray-800 leading-relaxed">${page.text}</p>
                                    ${navButtons}
                               </div>`;
                    break;
            }
            storybookViewer.innerHTML = content;
            document.getElementById('page-indicator').textContent = `صفحة ${currentPageIndex + 1} من ${bookData.length}`;
        }

        function navigatePage(direction) {
            const newIndex = currentPageIndex + direction;
            if (newIndex >= 0 && newIndex < bookData.length) {
                currentPageIndex = newIndex;
                displayCurrentPage();
            }
        }
        
        function resetView() {
            // Reset all inputs and state
            inputSection.classList.remove('hidden');
            storybookSection.classList.add('hidden');
            loadingSection.classList.add('hidden');
            const fields = ['character-name', 'character-age', 'character-interests', 'story-summary', 'dedication', 'character-image-input'];
            fields.forEach(id => document.getElementById(id).value = '');
            document.getElementById('character-image-preview').classList.add('hidden');
            document.getElementById('character-image-placeholder').classList.remove('hidden');
            characterImageBase64 = null;
            characterImageURL = null;
            bookData = [];
            currentPageIndex = 0;
        }

        async function downloadAsPDF() {
            const { jsPDF } = window.jspdf;
            const pdfWidth = 595;
            const pdfHeight = 842;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [pdfWidth, pdfHeight] });
            const renderContainer = document.getElementById('pdf-render-container');
            
            const originalButtonText = downloadPdfBtn.textContent;
            downloadPdfBtn.disabled = true;
            downloadPdfBtn.textContent = 'جاري إعداد الـ PDF...';
            
            let textPageIndex = 0;

            for (let i = 0; i < bookData.length; i++) {
                const page = bookData[i];
                let pageHtml = '';
                
                renderContainer.style.width = `${pdfWidth}px`;
                renderContainer.style.height = `${pdfHeight}px`;

                switch (page.type) {
                    case 'cover':
                        pageHtml = `<div style="width: ${pdfWidth}px; height: ${pdfHeight}px; background-image: url('${page.imageUrl}'); background-size: cover; position: relative; display: flex; flex-direction:column; align-items: center; justify-content: center; color:white; text-align:center;">
                                        <div style="position: absolute; inset: 0; background-color: rgba(0,0,0,0.3);"></div>
                                        <h2 style="font-family: 'Marhey', sans-serif; font-size: 48px; font-weight: bold; position: relative; text-shadow: 2px 2px 8px rgba(0,0,0,0.7);">${page.title}</h2>
                                        <p style="font-family: 'Marhey', sans-serif; font-size: 24px; margin-top: 16px; position: relative; text-shadow: 1px 1px 4px rgba(0,0,0,0.7);">قصة بطولة: ${page.characterName}</p>
                                    </div>`;
                        break;
                    case 'dedication':
                    case 'conclusion':
                         pageHtml = `<div style="width: ${pdfWidth}px; height: ${pdfHeight}px; display: flex; align-items: center; justify-content: center; padding: 40px; background: linear-gradient(180deg, #e0f2fe 0%, #fff1f2 100%);">
                                        <p style="font-family: 'Marhey', sans-serif; font-size: 24px; text-align: center; color: #374151; font-style: italic;">"${page.text}"</p>
                                    </div>`;
                        break;
                    case 'introduction':
                         pageHtml = `<div style="width: ${pdfWidth}px; height: ${pdfHeight}px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; padding: 40px; background: linear-gradient(180deg, #d1fae5 0%, #e0f2fe 100%);">
                                        <img src="${page.realImageUrl}" style="border-radius: 9999px; object-fit: cover; width: 150px; height: 150px; border: 5px solid white; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
                                        <img src="${page.imageUrl}" style="object-fit: contain; max-height: 250px;">
                                        <div style="background-color: rgba(255,255,255,0.7); backdrop-filter: blur(8px); border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align:center;">
                                            <p style="font-family: 'Marhey', sans-serif; font-size: 20px; color: #1f2937; line-height: 1.8;">${page.text}</p>
                                        </div>
                                   </div>`;
                        break;
                    case 'story_image':
                        pageHtml = `<div style="width: ${pdfWidth}px; height: ${pdfHeight}px; background-image: url('${page.imageUrl}'); background-size: cover;"></div>`;
                        break;
                    case 'story_text':
                        const positions = [
                            { container: 'align-items: flex-end; justify-content: flex-start;', text: 'text-align: right;' },
                            { container: 'align-items: flex-start; justify-content: flex-end;', text: 'text-align: left;' },
                            { container: 'align-items: center; justify-content: center;', text: 'text-align: center;' },
                            { container: 'align-items: flex-end; justify-content: flex-end;', text: 'text-align: left;'},
                            { container: 'align-items: flex-start; justify-content: flex-start;', text: 'text-align: right;'}
                        ];
                        const imagePositions = [
                            { style: 'position: absolute; top: 40px; right: 40px; transform: rotate(8deg); z-index: 3;' },
                            { style: 'position: absolute; bottom: 40px; left: 40px; transform: rotate(-7deg); z-index: 3;' },
                            { style: 'position: absolute; top: 40px; left: 40px; transform: rotate(-5deg); z-index: 3;' },
                            { style: 'position: absolute; bottom: 40px; right: 40px; transform: rotate(6deg); z-index: 3;' }
                        ];

                        const pos = positions[textPageIndex % positions.length];
                        const imgPos = imagePositions[textPageIndex % imagePositions.length];
                        
                        // FIX: Using smaller font-size and a more defined text-shadow (stroke effect)
                        const cartoonBgUrl = bookData[i - 1].imageUrl;
                        const textStyle = `font-family: 'Marhey', sans-serif; font-size: 22px; color: white; line-height: 1.9; font-weight: 700; text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 10px rgba(0,0,0,0.7);`;

                        pageHtml = `<div style="width: ${pdfWidth}px; height: ${pdfHeight}px; position: relative; overflow: hidden;">
                                        <!-- Layer 1: Blurred Background -->
                                        <div style="position: absolute; inset: 0; background-image: url('${cartoonBgUrl}'); background-size: cover; filter: blur(6px) brightness(0.7); z-index: 1;"></div>
                                        
                                        <!-- Layer 2: Realistic Image -->
                                        <img src="${page.realisticImageUrl}" style="width: 150px; height: auto; border: 8px solid white; box-shadow: 0 5px 20px rgba(0,0,0,0.5); border-radius: 4px; ${imgPos.style}">

                                        <!-- Layer 3: Text -->
                                        <div style="position: absolute; inset: 0; display: flex; padding: 60px; ${pos.container} z-index: 2;">
                                            <div style="position: relative; max-width: 80%;">
                                                <p style="${textStyle} ${pos.text}">${page.text}</p>
                                            </div>
                                        </div>
                                    </div>`;
                        textPageIndex++;
                        break;
                }
                
                renderContainer.innerHTML = pageHtml;
                
                await new Promise(resolve => setTimeout(resolve, 500)); 

                const canvas = await html2canvas(renderContainer.firstElementChild, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: null
                });
                
                const imgData = canvas.toDataURL('image/jpeg', 0.9);

                if (i > 0) {
                    pdf.addPage([pdfWidth, pdfHeight], 'portrait');
                }
                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            }
            
            pdf.save(`كتاب-${document.getElementById('character-name').value || 'بطلي'}.pdf`);
            renderContainer.innerHTML = '';
            downloadPdfBtn.disabled = false;
            downloadPdfBtn.textContent = '📥 تحميل PDF';
        }

    </script>
</body>
</html>
