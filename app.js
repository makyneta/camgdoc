/* ==========================================================================
   APP.JS - Lógica Interativa e Sincronização em Tempo Real (CAMG)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. MAPEAMENTO DE ELEMENTOS E SELETORES
    // ==========================================================================
    
    // Inputs de Formulário (Dados Gerais e Destinatário)
    const inputDocRef = document.getElementById('doc-ref');
    const inputDocDate = document.getElementById('doc-date');
    const inputDestName = document.getElementById('dest-name');
    const inputDestAddress = document.getElementById('dest-address');
    const inputDestZip = document.getElementById('dest-zip');
    const inputDestCity = document.getElementById('dest-city');
    
    // Conteúdo da Carta
    const inputDocSubject = document.getElementById('doc-subject');
    const inputDocSalutation = document.getElementById('doc-salutation');
    const inputDocBody = document.getElementById('doc-body');
    const inputDocValediction = document.getElementById('doc-valediction');
    
    // Assinante
    const inputSignName = document.getElementById('sign-name');
    const inputSignRole = document.getElementById('sign-role');
    
    // Contactos Oficiais do Clube
    const inputFootAddress = document.getElementById('foot-address');
    const inputFootPhone = document.getElementById('foot-phone');
    const inputFootEmail = document.getElementById('foot-email');
    const inputFootWeb = document.getElementById('foot-web');
    const inputFootInsta = document.getElementById('foot-insta');
    const inputFootSocials = document.getElementById('foot-socials');
    
    // Toggles de Opções
    const toggleEnvWindow = document.getElementById('env-window');
    const toggleEnvSender = document.getElementById('env-sender');
    const toggleShowLogo = document.getElementById('show-logo');
    const toggleShowFoldMarks = document.getElementById('show-fold-marks');
    const toggleShowSigLine = document.getElementById('show-signature-line');
    
    // Ajustes Avançados
    const selectFont = document.getElementById('setting-font');
    const selectFontSize = document.getElementById('setting-fontsize');
    const selectLineHeight = document.getElementById('setting-lineheight');
    const radioStyles = document.querySelectorAll('input[name="stationery-style"]');
    
    // Elementos de Pré-visualização na Carta A4
    const prevRef = document.getElementById('preview-ref');
    const prevDate = document.getElementById('preview-date');
    const prevDestName = document.getElementById('preview-dest-name');
    const prevDestAddress = document.getElementById('preview-dest-address');
    const prevDestZipCity = document.getElementById('preview-dest-zipcity');
    const prevSubject = document.getElementById('preview-subject');
    const prevSalutation = document.getElementById('preview-salutation');
    const prevBody = document.getElementById('preview-body');
    const prevValediction = document.getElementById('preview-valediction');
    const prevSignName = document.getElementById('preview-sign-name');
    const prevSignRole = document.getElementById('preview-sign-role');
    const prevSigBlock = document.getElementById('preview-sig-block');
    const prevSigLine = document.getElementById('preview-sig-line');
    
    // Previews do Rodapé (Carta)
    const prevFootAddr = document.getElementById('preview-foot-addr');
    const prevFootPhone = document.getElementById('preview-foot-phone');
    const prevFootEmail = document.getElementById('preview-foot-email');
    const prevFootWeb = document.getElementById('preview-foot-web');
    const prevFootInsta = document.getElementById('preview-foot-insta');
    const prevFootSocials = document.getElementById('preview-foot-socials');
    
    // Elementos de Pré-visualização no Envelope DL
    const prevEnvDlName = document.getElementById('preview-env-dl-name');
    const prevEnvDlAddress = document.getElementById('preview-env-dl-address');
    const prevEnvDlZipCity = document.getElementById('preview-env-dl-zipcity');
    const prevEnvDlSenderAddr = document.getElementById('preview-env-dl-sender-addr');
    const blockDlSender = document.getElementById('env-dl-sender-block');
    
    // Elementos de Pré-visualização no Envelope C5
    const prevEnvC5Name = document.getElementById('preview-env-c5-name');
    const prevEnvC5Address = document.getElementById('preview-env-c5-address');
    const prevEnvC5ZipCity = document.getElementById('preview-env-c5-zipcity');
    const prevEnvC5SenderAddr = document.getElementById('preview-env-c5-sender-addr');
    const blockC5Sender = document.getElementById('env-c5-sender-block');
    
    // Estruturas de Ecrã / Contentores
    const letterPage = document.getElementById('letter-page');
    const envelopeDlPage = document.getElementById('envelope-dl-page');
    const envelopeC5Page = document.getElementById('envelope-c5-page');
    const notepadA5Page = document.getElementById('notepad-a5-page');
    const a4Sheet = document.getElementById('a4-sheet');
    const a5Sheet = document.getElementById('a5-sheet');
    
    // Painel de Métricas (Direita)
    const metricWords = document.getElementById('metric-words');
    const metricChars = document.getElementById('metric-chars');
    const progressChars = document.getElementById('metric-chars-progress');
    const cttWeight = document.getElementById('ctt-weight');
    const cttPrice = document.getElementById('ctt-price');
    const ruleMargins = document.getElementById('rule-margins');
    const ruleSender = document.getElementById('rule-sender');
    const ruleZip = document.getElementById('rule-zip');
    const ruleDensity = document.getElementById('rule-density');
    
    // Botões de Ação JSON
    const btnSaveJson = document.getElementById('btn-save-json');
    const btnLoadJson = document.getElementById('btn-load-json');
    const inputFileJson = document.getElementById('input-file-json');
    
    // Outros Botões
    const btnToday = document.getElementById('btn-today');
    const btnPrint = document.getElementById('btn-print');
    const btnClear = document.getElementById('btn-clear');
    const btnResetDefaults = document.getElementById('btn-reset-defaults');
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const zoomText = document.getElementById('zoom-text');
    
    // ==========================================================================
    // 2. CONFIGURAÇÃO DE VALORES E PRESETS OFICIAIS DO CAMG
    // ==========================================================================
    
    const DEFAULTS = {
        docRef: '',
        destName: '',
        destAddress: '',
        destZip: '',
        destCity: '',
        docSubject: '',
        docSalutation: '',
        docBody: '',
        docValediction: '',
        signName: 'Ana Paula André',
        signRole: 'Presidente do Clube',
        
        footAddress: 'Estádio Municipal da Marinha Grande (Av. Dr. José Henriques Vareda 118, 2430-307 Marinha Grande)',
        footPhone: '+351 928 119 160',
        footEmail: 'catletismomg@gmail.com',
        footWeb: 'www.catletismomg.pt',
        footInsta: '@camg_atletismo',
        footSocials: '@catletismomg'
    };

    const PRESETS = {
        patrocinio: {
            docRef: 'Ofício Nº CAMG-2026/PAT-04',
            destName: 'À Administração da Vidreira da Marinha Grande, Lda.',
            destAddress: 'Zona Industrial da Marinha Grande, Lote 14',
            destZip: '2430-096',
            destCity: 'Marinha Grande',
            docSubject: 'Proposta de Parceria e Patrocínio Desportivo - Época 2026/2027',
            docSalutation: 'Exmos. Senhores Administradores,',
            docBody: 'O Clube Atletismo de Marinha Grande celebra este ano o seu 30º aniversário de intensa atividade desportiva, social e formativa no nosso concelho. Contamos atualmente com mais de 120 atletas federados, desde os escalões de formação (benjamins) até aos escalões veteranos, acumulando vários títulos nacionais e distritais.\n\nVimos por este meio propor a associação da vossa prestigiada marca ao nosso projeto desportivo sob a forma de patrocínio para a próxima época. O vosso logótipo figurará com destaque nos nossos equipamentos oficiais de competição, carrinhas de transporte e suportes de comunicação digital (redes sociais e transmissões em streaming).\n\nMais informamos que o clube está legalmente abrangido pelo Estatuto do Mecenato Desportivo, pelo que todas as contribuições financeiras ou materiais beneficiam de importantes majorações fiscais em sede de IRC. Anexamos o dossier de apresentação detalhado e ficamos ao dispor para agendar uma breve reunião.',
            docValediction: 'Na expectativa de podermos caminhar juntos rumo a novas vitórias, subscrevemo-nos,',
            signName: 'Ana Paula André',
            signRole: 'Presidente do Clube'
        },
        convocatoria: {
            docRef: 'Convocatória CAMG-2026/AG-01',
            destName: 'Estimados Associados do CAMG',
            destAddress: 'Assembleia Geral Ordinária',
            destZip: '2430-307',
            destCity: 'Marinha Grande',
            docSubject: 'Convocatória para Assembleia Geral Ordinária',
            docSalutation: 'Caros Associados,',
            docBody: 'Nos termos dos Estatutos em vigor e da legislação aplicável, convoco todos os associados do Clube Atletismo de Marinha Grande a reunirem-se em Assembleia Geral Ordinária, a realizar-se no dia 18 de Junho de 2026, pelas 20:30 horas, na Sede Social sita no Estádio Municipal da Marinha Grande.\n\nA Assembleia terá a seguinte Ordem de Trabalhos:\n1. Apresentação, discussão e votação do Relatório de Atividades e Contas relativos ao ano de 2025;\n2. Discussão e votação do Plano de Atividades e Orçamento para o desenvolvimento da época 2026/2027;\n3. Discussão de assuntos de interesse geral para o futuro desportivo e associativo do Clube.\n\nSe à hora marcada não se verificar a presença da maioria absoluta dos associados, a Assembleia Geral iniciará trinta minutos depois (às 21:00 horas), no mesmo local e com qualquer número de associados presentes.',
            docValediction: 'Apelando à participação ativa de todos para o fortalecimento do nosso clube, apresentamos saudações desportivas,',
            signName: 'Ana Paula André',
            signRole: 'Presidente do Clube'
        },
        milha: {
            docRef: 'Ofício Nº CAMG-2026/MC-01',
            destName: 'Exmo. Senhor Diretor Regional do IPDJ do Centro',
            destAddress: 'Rua do Brasil, Nº 45 - 2º Andar',
            destZip: '3030-175',
            destCity: 'Coimbra',
            docSubject: 'Convite de Honra - 37ª Milha de Cristal',
            docSalutation: 'Exmo. Senhor Diretor Regional,',
            docBody: 'É com enorme orgulho e entusiasmo que o Clube Atletismo de Marinha Grande organiza a 37ª edição da Milha de Cristal, reconhecida como a milha urbana mais antiga e emblemática de Portugal. A prova irá realizar-se no dia 25 de Abril, tendo como cenário o centro urbano da Marinha Grande e a envolvência do Teatro Stephens.\n\nDada a relevância nacional do evento para o atletismo de estrada e o constante apoio que o Instituto Português do Desporto e da Juventude tem prestado ao desporto de base, seria para nós uma honra inestimável contar com a presença de V. Exa. na tribuna presidencial e na cerimónia de entrega de prémios, agendada para as 17:00 horas.\n\nAgradecemos antecipadamente a atenção dispensada e solicitamos a amabilidade de nos confirmar a sua comparência até ao dia 15 de Abril para efeitos de protocolo organizativo.',
            docValediction: 'Com os nossos mais respeitosos cumprimentos,',
            signName: 'Ana Paula André',
            signRole: 'Presidente do Clube'
        },
        declaracao: {
            docRef: 'Declaração CAMG-2026/DEC-05',
            destName: 'À Associação de Atletismo de Leiria (ADAL)',
            destAddress: 'Para os devidos efeitos de confirmação desportiva',
            destZip: '2400-137',
            destCity: 'Leiria',
            docSubject: 'Declaração de Filiação Ativa de Atleta Federado',
            docSalutation: 'A quem possa interessar,',
            docBody: 'Para os devidos efeitos legais e desportivos, declara-se que o atleta inscrito na Federação Portuguesa de Atletismo com o número de licença FPA-987654 e cartão de cidadão nº 14859382 está formalmente filiado e ativo no Clube Atletismo de Marinha Grande na presente época desportiva 2025/2026.\n\nMais se atesta que o referido atleta cumpre integralmente todos os requisitos regulamentares e exames médicos obrigatórios, estando plenamente qualificado para representar este clube nas competições integradas no calendário oficial de provas de pista, corta-mato e estrada da Federação e respetivas associações distritais.\n\nA presente declaração é emitida a pedido do interessado, por corresponder inteiramente à verdade, e vai devidamente assinada com o carimbo oficial deste clube.',
            docValediction: 'Marinha Grande, 28 de maio de 2026',
            signName: 'Ana Paula André',
            signRole: 'Presidente do Clube'
        }
    };

    // ==========================================================================
    // 3. FUNÇÕES DE SINCRONIZAÇÃO EM TEMPO REAL E CÁLCULO DE MÉTRICAS
    // ==========================================================================
    
    // Formatar data em português
    function formatDateToPortuguese(dateString) {
        if (!dateString) return '';
        const months = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return dateString;
        
        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        
        return `Marinha Grande, ${day} de ${month} de ${year}`;
    }

    // Calcular palavras e caracteres
    function recalculateMetrics() {
        const bodyText = inputDocBody.value || '';
        
        // Contagem de palavras
        const wordCount = bodyText.trim() === '' ? 0 : bodyText.trim().split(/\s+/).length;
        metricWords.textContent = wordCount;
        
        // Contagem de caracteres (limite recomendado 2200)
        const charCount = bodyText.length;
        metricChars.textContent = `${charCount} / 2200`;
        
        // Progress Bar
        const progressPercentage = Math.min((charCount / 2200) * 100, 100);
        progressChars.style.width = `${progressPercentage}%`;
        
        if (charCount > 1800) {
            progressChars.classList.add('limit-warning');
            ruleDensity.classList.remove('passed');
            ruleDensity.querySelector('.rule-icon').textContent = '⚠';
            ruleDensity.querySelector('.rule-text').textContent = 'Volume alto de texto (risco de 2ª página)';
        } else {
            progressChars.classList.remove('limit-warning');
            ruleDensity.classList.add('passed');
            ruleDensity.querySelector('.rule-icon').textContent = '✓';
            ruleDensity.querySelector('.rule-text').textContent = 'Densidade de texto recomendada';
        }
        
        // Estimativa CTT
        const selectedDocType = document.querySelector('input[name="doc-type"]:checked').value;
        let totalWeight = 5; // Base do envelope
        
        if (selectedDocType === 'letter') {
            totalWeight += 5; // Folha A4 pesa cerca de 5g
        }
        
        cttWeight.textContent = `${totalWeight} g`;
        cttPrice.textContent = totalWeight <= 20 ? '0,65 €' : '1,15 €';
    }

    // Validar regras de envio postal CTT
    function validateCttRules() {
        // Regra ZIP Code (Formato 2430-307)
        const zipValue = inputDestZip.value || '';
        const zipPattern = /^\d{4}-\d{3}$/;
        const isZipValid = zipPattern.test(zipValue);
        
        if (isZipValid) {
            ruleZip.classList.add('passed');
            ruleZip.querySelector('.rule-icon').textContent = '✓';
        } else {
            ruleZip.classList.remove('passed');
            ruleZip.querySelector('.rule-icon').textContent = '✗';
        }
        
        // Regra Remetente Visível
        const isSenderChecked = toggleEnvSender.checked;
        if (isSenderChecked) {
            ruleSender.classList.add('passed');
            ruleSender.querySelector('.rule-icon').textContent = '✓';
        } else {
            ruleSender.classList.remove('passed');
            ruleSender.querySelector('.rule-icon').textContent = '✗';
        }
    }

    // Helper to create a cloned subsequent page for A4 Letter pagination
    function createSubsequentPage() {
        const clone = a4Sheet.cloneNode(true);
        clone.removeAttribute('id'); // Remove id to avoid duplicate IDs in the DOM
        clone.classList.add('page-a4-subsequent');
        
        // Hide elements that should only appear on page 1
        const rBox = clone.querySelector('.recipient-window-envelope');
        const mSec = clone.querySelector('.meta-section');
        const sLine = clone.querySelector('.subject-line');
        const sal = clone.querySelector('#preview-salutation');
        const val = clone.querySelector('#preview-valediction');
        const body = clone.querySelector('#preview-body');
        
        if (rBox) rBox.style.display = 'none';
        if (mSec) mSec.style.display = 'none';
        if (sLine) sLine.style.display = 'none';
        if (sal) sal.style.display = 'none';
        if (val) {
            val.style.display = 'none';
            val.classList.add('valediction-subsequent');
        }
        if (body) {
            body.innerHTML = '';
            body.classList.add('body-text-subsequent');
        }
        
        letterPage.appendChild(clone);
        return clone;
    }

    // Atualização principal da visualização
    function updatePreviews() {
        // 1. Reset A4 sheet state (restore visibility for elements that might have been hidden on page 1 during previous pagination)
        const recipientBox = a4Sheet.querySelector('.recipient-window-envelope');
        const metaSec = a4Sheet.querySelector('.meta-section');
        const subLine = a4Sheet.querySelector('.subject-line');
        const cloneSalutation = a4Sheet.querySelector('#preview-salutation');
        const cloneValediction = a4Sheet.querySelector('#preview-valediction');
        const cloneBody = a4Sheet.querySelector('#preview-body');
        
        if (recipientBox) recipientBox.style.display = '';
        if (metaSec) metaSec.style.display = '';
        if (subLine) subLine.style.display = '';
        if (cloneSalutation) cloneSalutation.style.display = '';
        if (cloneValediction) {
            cloneValediction.style.display = '';
            cloneValediction.classList.remove('valediction-subsequent');
        }
        if (cloneBody) {
            cloneBody.classList.remove('body-text-subsequent');
            cloneBody.innerHTML = '';
        }

        // Remove dynamic pages from previous rendering loop
        const dynamicPages = letterPage.querySelectorAll('.page-a4:not(#a4-sheet)');
        dynamicPages.forEach(p => p.remove());

        // 2. Identificação e Metadados (Carta)
        prevRef.textContent = inputDocRef.value || '[Referência]';
        prevDate.textContent = formatDateToPortuguese(inputDocDate.value) || 'Marinha Grande, [Data]';
        
        // 3. Destinatário (Carta e Envelopes)
        const nameVal = inputDestName.value || '[Nome do Destinatário]';
        const addrVal = inputDestAddress.value || '[Morada]';
        const zipVal = inputDestZip.value || '0000-000';
        const cityVal = inputDestCity.value || '[Localidade]';
        const zipCityVal = `${zipVal} ${cityVal}`;
        
        // Em Carta
        prevDestName.textContent = nameVal;
        prevDestAddress.textContent = addrVal;
        prevDestZipCity.textContent = zipCityVal;
        
        // Em Envelope DL
        prevEnvDlName.textContent = nameVal;
        prevEnvDlAddress.textContent = addrVal;
        prevEnvDlZipCity.textContent = zipCityVal;
        
        // Em Envelope C5
        prevEnvC5Name.textContent = nameVal;
        prevEnvC5Address.textContent = addrVal;
        prevEnvC5ZipCity.textContent = zipCityVal;
        
        // 4. Assunto e Saudação (Carta)
        prevSubject.textContent = inputDocSubject.value || '[Assunto do Documento]';
        prevSalutation.textContent = inputDocSalutation.value || 'Exmo.(a) Senhor(a),';
        prevValediction.textContent = inputDocValediction.value || 'Com os melhores cumprimentos,';

        // Renderizar corpo com paginação automática baseada em scrollHeight
        const rawBody = inputDocBody.value || 'Escreva o texto principal...';
        const paragraphs = rawBody.split('\n\n').map(p => p.trim()).filter(p => p !== '');
        
        const paragraphHTMLs = paragraphs.map(p => {
            const cleanP = p.replace(/\n/g, '<br>');
            return `<p>${cleanP}</p>`;
        });

        // Loop de distribuição do corpo pelas páginas
        let currentPage = a4Sheet;
        let currentBodyContainer = cloneBody;

        for (let i = 0; i < paragraphHTMLs.length; i++) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = paragraphHTMLs[i];
            const newP = tempDiv.firstElementChild;
            currentBodyContainer.appendChild(newP);
            
            // Se ultrapassar o limite físico da página A4 (297mm)
            if (currentPage.scrollHeight > currentPage.clientHeight) {
                currentBodyContainer.removeChild(newP);
                
                // Se a página já estava vazia (parágrafo único gigante), força para evitar loop infinito
                if (currentBodyContainer.children.length === 0) {
                    currentBodyContainer.appendChild(newP);
                    currentPage = createSubsequentPage();
                    currentBodyContainer = currentPage.querySelector('#preview-body');
                } else {
                    currentPage = createSubsequentPage();
                    currentBodyContainer = currentPage.querySelector('#preview-body');
                    currentBodyContainer.appendChild(newP);
                }
            }
        }

        // Posicionar a valedicação / fecho
        // Se a primeira página não for a última, esconde a valedicação na primeira página
        if (currentPage !== a4Sheet) {
            const firstValediction = a4Sheet.querySelector('#preview-valediction');
            if (firstValediction) firstValediction.style.display = 'none';
        }

        const lastValediction = currentPage.querySelector('.valediction-subsequent') || currentPage.querySelector('#preview-valediction');
        if (lastValediction) {
            lastValediction.textContent = inputDocValediction.value || 'Com os melhores cumprimentos,';
            lastValediction.style.display = 'block';
            
            // Se a valedicação causou transbordo na última página, move-a para uma nova página
            if (currentPage.scrollHeight > currentPage.clientHeight) {
                lastValediction.style.display = 'none';
                currentPage = createSubsequentPage();
                const finalValediction = currentPage.querySelector('.valediction-subsequent');
                if (finalValediction) {
                    finalValediction.textContent = inputDocValediction.value || 'Com os melhores cumprimentos,';
                    finalValediction.style.display = 'block';
                }
            }
        }
        
        // 5. Assinatura (Carta - Removida)
        if (prevSignName && inputSignName) {
            prevSignName.textContent = inputSignName.value || 'Ana Paula André';
        }
        if (prevSignRole && inputSignRole) {
            prevSignRole.textContent = inputSignRole.value || 'Presidente do Clube';
        }
        
        // 5. Contactos do Rodapé (Carta e Envelopes)
        const footAddrVal = inputFootAddress.value || '';
        const footPhoneVal = inputFootPhone.value || '';
        const footEmailVal = inputFootEmail.value || '';
        const footWebVal = inputFootWeb.value || '';
        const footInstaVal = inputFootInsta.value || '';
        const footSocialsVal = inputFootSocials.value || '';
        
        prevFootAddr.textContent = footAddrVal;
        prevFootPhone.textContent = footPhoneVal;
        prevFootEmail.textContent = footEmailVal;
        prevFootWeb.textContent = footWebVal;
        prevFootInsta.textContent = footInstaVal;
        prevFootSocials.textContent = footSocialsVal;
        
        // Morada simplificada do remetente nos Envelopes
        const senderString = `CAMG - Estádio Municipal da Marinha Grande, Av. Dr. José Henriques Vareda 118, 2430-307 Marinha Grande`;
        prevEnvDlSenderAddr.textContent = senderString;
        prevEnvC5SenderAddr.textContent = senderString;
        
        // 6. Bloco de Notas A5 Preview Sync
        const notepadTitleInput = document.getElementById('notepad-title');
        const notepadFootLeftInput = document.getElementById('notepad-footer-left');
        const notepadFootRightInput = document.getElementById('notepad-footer-right');
        
        const prevNotepadTitle = document.getElementById('preview-notepad-title');
        const prevNotepadFootLeft = document.getElementById('preview-notepad-foot-left');
        const prevNotepadFootRight = document.getElementById('preview-notepad-foot-right');
        
        if (prevNotepadTitle && notepadTitleInput) prevNotepadTitle.textContent = notepadTitleInput.value || 'Anotações';
        if (prevNotepadFootLeft && notepadFootLeftInput) prevNotepadFootLeft.textContent = notepadFootLeftInput.value || 'imprima, personalize, impressione';
        if (prevNotepadFootRight && notepadFootRightInput) prevNotepadFootRight.textContent = notepadFootRightInput.value || 'imprima, personalize, impressione';

        const notepadFootAddr = document.getElementById('preview-notepad-foot-addr');
        const notepadFootPhone = document.getElementById('preview-notepad-foot-phone');
        const notepadFootEmail = document.getElementById('preview-notepad-foot-email');
        const notepadFootWeb = document.getElementById('preview-notepad-foot-web');
        
        if (notepadFootAddr) notepadFootAddr.textContent = footAddrVal;
        if (notepadFootPhone) notepadFootPhone.textContent = footPhoneVal;
        if (notepadFootEmail) notepadFootEmail.textContent = footEmailVal;
        if (notepadFootWeb) notepadFootWeb.textContent = footWebVal;

        if (a5Sheet) {
            const patternSelect = document.getElementById('notepad-pattern');
            const spacingSelect = document.getElementById('notepad-spacing');
            const lineOpacitySelect = document.getElementById('notepad-line-color');
            const showDateToggle = document.getElementById('notepad-show-date');
            const showMarginToggle = document.getElementById('notepad-show-margin');
            
            const pattern = patternSelect ? patternSelect.value : 'ruled';
            const spacing = spacingSelect ? spacingSelect.value : '8mm';
            const opacity = lineOpacitySelect ? lineOpacitySelect.value : '0.15';
            const showDate = showDateToggle ? showDateToggle.checked : true;
            const showMargin = showMarginToggle ? showMarginToggle.checked : false;
            
            // Set pattern class
            a5Sheet.classList.remove('pattern-ruled', 'pattern-grid', 'pattern-dotted', 'pattern-blank');
            a5Sheet.classList.add(`pattern-${pattern}`);
            
            // Set margin line class
            if (showMargin) {
                a5Sheet.classList.add('has-margin-line');
            } else {
                a5Sheet.classList.remove('has-margin-line');
            }
            
            // Set date header visibility
            const dateField = document.getElementById('preview-notepad-top-meta');
            if (dateField) {
                dateField.style.display = showDate ? 'flex' : 'none';
            }
            
            // Set CSS variables
            a5Sheet.style.setProperty('--notepad-spacing', spacing);
            
            // Convert theme primary to rgba
            const activeTheme = document.querySelector('.theme-card.active');
            let themePrimary = '#0f4c3a'; // fallback
            if (activeTheme) {
                const themeVal = activeTheme.getAttribute('data-theme');
                if (themeVal === 'theme-azul') themePrimary = '#124160';
                else if (themeVal === 'theme-preto-ouro') themePrimary = '#111111';
                else if (themeVal === 'theme-minimalista') themePrimary = '#000000';
            }
            
            let rgbStr = '0, 0, 0';
            if (themePrimary.startsWith('#')) {
                const hex = themePrimary.replace('#', '');
                let r, g, b;
                if (hex.length === 3) {
                    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
                    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
                    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
                } else if (hex.length === 6) {
                    r = parseInt(hex.substring(0, 2), 16);
                    g = parseInt(hex.substring(2, 4), 16);
                    b = parseInt(hex.substring(4, 6), 16);
                }
                rgbStr = `${r}, ${g}, ${b}`;
            }
            
            a5Sheet.style.setProperty('--notepad-line-color-rgb', `rgba(${rgbStr}, ${opacity})`);
        }
        
        // Recalcular métricas adicionais do painel direito
        recalculateMetrics();
        validateCttRules();
    }

    // Ouvintes de Input
    const allInputs = [
        inputDocRef, inputDocDate, inputDestName, inputDestAddress, 
        inputDestZip, inputDestCity, inputDocSubject, inputDocSalutation, 
        inputDocBody, inputDocValediction, inputSignName, inputSignRole,
        inputFootAddress, inputFootPhone, inputFootEmail,
        inputFootWeb, inputFootInsta, inputFootSocials
    ];
    
    allInputs.forEach(input => {
        if(input) {
            input.addEventListener('input', updatePreviews);
        }
    });

    // Ouvintes do Bloco de Notas
    const notepadControls = [
        'notepad-title', 'notepad-footer-left', 'notepad-footer-right',
        'notepad-pattern', 'notepad-spacing', 'notepad-line-color'
    ];
    notepadControls.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updatePreviews);
            el.addEventListener('change', updatePreviews);
        }
    });
    
    const notepadToggles = ['notepad-show-date', 'notepad-show-margin'];
    notepadToggles.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', updatePreviews);
        }
    });

    // ==========================================================================
    // 4. SISTEMA DE ABAS (TABS)
    // ==========================================================================
    
    const tabs = document.querySelectorAll('.nav-tab');
    const panes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            const paneId = this.getAttribute('data-tab');
            document.getElementById(paneId).classList.add('active');
        });
    });

    // ==========================================================================
    // 5. ALTERNÂNCIA DE TIPO DE DOCUMENTO (CARTA / ENVELOPES)
    // ==========================================================================
    
    const docTypeCards = document.querySelectorAll('.doc-type-card');
    const letterOnlySections = document.querySelectorAll('.letter-only');
    const envelopeOnlySections = document.querySelectorAll('.envelope-only');
    const notepadOnlySections = document.querySelectorAll('.notepad-only');
    
    docTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            docTypeCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            const docType = radio.value;
            
            if (docType === 'letter') {
                letterOnlySections.forEach(el => el.style.display = 'flex');
                envelopeOnlySections.forEach(el => el.style.display = 'none');
                notepadOnlySections.forEach(el => el.style.display = 'none');
                
                letterPage.classList.add('active');
                envelopeDlPage.classList.remove('active');
                envelopeC5Page.classList.remove('active');
                if (notepadA5Page) notepadA5Page.classList.remove('active');
            } else if (docType === 'notepad-a5') {
                letterOnlySections.forEach(el => el.style.display = 'none');
                envelopeOnlySections.forEach(el => el.style.display = 'none');
                notepadOnlySections.forEach(el => el.style.display = 'flex');
                
                letterPage.classList.remove('active');
                envelopeDlPage.classList.remove('active');
                envelopeC5Page.classList.remove('active');
                if (notepadA5Page) notepadA5Page.classList.add('active');
            } else if (docType === 'envelope-dl') {
                letterOnlySections.forEach(el => el.style.display = 'none');
                envelopeOnlySections.forEach(el => el.style.display = 'flex');
                notepadOnlySections.forEach(el => el.style.display = 'none');
                
                letterPage.classList.remove('active');
                envelopeDlPage.classList.add('active');
                envelopeC5Page.classList.remove('active');
                if (notepadA5Page) notepadA5Page.classList.remove('active');
            } else if (docType === 'envelope-c5') {
                letterOnlySections.forEach(el => el.style.display = 'none');
                envelopeOnlySections.forEach(el => el.style.display = 'flex');
                notepadOnlySections.forEach(el => el.style.display = 'none');
                
                letterPage.classList.remove('active');
                envelopeDlPage.classList.remove('active');
                envelopeC5Page.classList.add('active');
                if (notepadA5Page) notepadA5Page.classList.remove('active');
            }
            
            resetZoomForDocType(docType);
            recalculateMetrics();
        });
    });

    // ==========================================================================
    // 6. AJUSTES AVANÇADOS DE TIPOGRAFIA E ESTILO DO PAPEL
    // ==========================================================================
    
    // Alterar Tipo de Letra da Carta
    selectFont.addEventListener('change', function() {
        a4Sheet.style.setProperty('--theme-font', this.value);
    });

    // Alterar Tamanho de Fonte da Carta
    selectFontSize.addEventListener('change', function() {
        a4Sheet.style.setProperty('--fontsize-adjust', this.value);
    });

    // Alterar Espaçamento de Linha da Carta
    selectLineHeight.addEventListener('change', function() {
        a4Sheet.style.setProperty('--lineheight-adjust', this.value);
    });

    // Seleção de Estilo de Design da Carta (Sport, Ceremonial, Executive, Minimal)
    const styleCards = document.querySelectorAll('.style-card');
    styleCards.forEach(card => {
        card.addEventListener('click', function() {
            styleCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            const styleVal = radio.value;
            
            // Remover todas as classes de estilo e aplicar a nova no A4
            a4Sheet.classList.remove('style-docex', 'style-sport', 'style-ceremonial', 'style-minimal', 'style-docex1', 'style-modern');
            a4Sheet.classList.add(`style-${styleVal}`);
            
            // Aplicar no A5
            if (a5Sheet) {
                a5Sheet.classList.remove('style-docex', 'style-sport', 'style-ceremonial', 'style-minimal', 'style-docex1', 'style-modern');
                a5Sheet.classList.add(`style-${styleVal}`);
            }
        });
    });

    // ==========================================================================
    // 7. CONTROLOS DE CONFIGURAÇÃO (TOGGLES)
    // ==========================================================================
    
    toggleEnvWindow.addEventListener('change', function() {
        const hasWindow = this.checked;
        const dlFace = envelopeDlPage.querySelector('.envelope-face');
        const c5Face = envelopeC5Page.querySelector('.envelope-face');
        
        if (hasWindow) {
            dlFace.classList.remove('no-window');
            c5Face.classList.remove('no-window');
        } else {
            dlFace.classList.add('no-window');
            c5Face.classList.add('no-window');
        }
    });

    toggleEnvSender.addEventListener('change', function() {
        const showSender = this.checked;
        blockDlSender.style.opacity = showSender ? '1' : '0';
        blockC5Sender.style.opacity = showSender ? '1' : '0';
        validateCttRules();
    });

    toggleShowLogo.addEventListener('change', function() {
        const showLogo = this.checked;
        const logoHolder = document.getElementById('logo-holder');
        if (showLogo) {
            a4Sheet.classList.remove('hide-logo-header');
            logoHolder.style.display = 'flex';
        } else {
            a4Sheet.classList.add('hide-logo-header');
            logoHolder.style.display = 'none';
        }
    });

    toggleShowFoldMarks.addEventListener('change', function() {
        const showFolds = this.checked;
        if (showFolds) {
            letterPage.classList.add('show-folds');
        } else {
            letterPage.classList.remove('show-folds');
        }
    });

    if (toggleShowSigLine) {
        toggleShowSigLine.addEventListener('change', function() {
            const showSig = this.checked;
            if (prevSigLine) prevSigLine.style.display = showSig ? 'block' : 'none';
            if (prevSigBlock) prevSigBlock.style.opacity = showSig ? '1' : '0.85';
        });
    }

    // ==========================================================================
    // 8. PRESETS DE TEXTO (MODELOS RÁPIDOS)
    // ==========================================================================
    
    const presetButtons = document.querySelectorAll('.btn-preset');
    
    presetButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const presetKey = this.getAttribute('data-preset');
            const presetData = PRESETS[presetKey];
            
            if (presetData) {
                inputDocRef.value = presetData.docRef;
                inputDestName.value = presetData.destName;
                inputDestAddress.value = presetData.destAddress;
                inputDestZip.value = presetData.destZip;
                inputDestCity.value = presetData.destCity;
                
                inputDocSubject.value = presetData.docSubject;
                inputDocSalutation.value = presetData.docSalutation;
                inputDocBody.value = presetData.docBody;
                inputDocValediction.value = presetData.docValediction;
                
                if (inputSignName) inputSignName.value = presetData.signName;
                if (inputSignRole) inputSignRole.value = presetData.signRole;
                
                // Mudar para a aba de conteúdo
                document.querySelector('[data-tab="tab-conteudo"]').click();
                updatePreviews();
            }
        });
    });

    // ==========================================================================
    // 9. TEMAS DE IDENTIDADE VISUAL
    // ==========================================================================
    
    const themeCards = document.querySelectorAll('.theme-card');
    const printableElements = [a4Sheet, a5Sheet, envelopeDlPage.querySelector('.envelope-dl-shape'), envelopeC5Page.querySelector('.envelope-c5-shape')];
    
    themeCards.forEach(card => {
        card.addEventListener('click', function() {
            themeCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const selectedTheme = this.getAttribute('data-theme');
            
            printableElements.forEach(el => {
                if (el) {
                    el.classList.remove('theme-verde-ouro', 'theme-azul', 'theme-preto-ouro', 'theme-minimalista');
                    el.classList.add(selectedTheme);
                }
            });
            updatePreviews();
        });
    });

    // ==========================================================================
    // 10. EXPORTAÇÃO E IMPORTAÇÃO JSON (SaaS Advanced Feature)
    // ==========================================================================
    
    // Exportar Ficheiro JSON
    btnSaveJson.addEventListener('click', function() {
        const configData = {
            docRef: inputDocRef.value,
            docDate: inputDocDate.value,
            destName: inputDestName.value,
            destAddress: inputDestAddress.value,
            destZip: inputDestZip.value,
            destCity: inputDestCity.value,
            docSubject: inputDocSubject.value,
            docSalutation: inputDocSalutation.value,
            docBody: inputDocBody.value,
            docValediction: inputDocValediction.value,
            signName: inputSignName ? inputSignName.value : '',
            signRole: inputSignRole ? inputSignRole.value : '',
            footAddress: inputFootAddress.value,
            footPhone: inputFootPhone.value,
            footEmail: inputFootEmail.value,
            footWeb: inputFootWeb.value,
            footInsta: inputFootInsta.value,
            footSocials: inputFootSocials.value,
            stationeryStyle: document.querySelector('input[name="stationery-style"]:checked').value,
            theme: document.querySelector('.theme-card.active').getAttribute('data-theme'),
            options: {
                showLogo: toggleShowLogo.checked,
                showFolds: toggleShowFoldMarks.checked,
                showSigLine: toggleShowSigLine ? toggleShowSigLine.checked : false,
                envWindow: toggleEnvWindow.checked,
                envSender: toggleEnvSender.checked
            }
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configData, null, 4));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `camg-documento-${inputDocRef.value || 'novo'}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });

    // Carregar Ficheiro JSON
    btnLoadJson.addEventListener('click', function() {
        inputFileJson.click();
    });

    inputFileJson.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const config = JSON.parse(e.target.result);
                
                // Repopular inputs
                if(config.docRef !== undefined) inputDocRef.value = config.docRef;
                if(config.docDate !== undefined) inputDocDate.value = config.docDate;
                if(config.destName !== undefined) inputDestName.value = config.destName;
                if(config.destAddress !== undefined) inputDestAddress.value = config.destAddress;
                if(config.destZip !== undefined) inputDestZip.value = config.destZip;
                if(config.destCity !== undefined) inputDestCity.value = config.destCity;
                
                if(config.docSubject !== undefined) inputDocSubject.value = config.docSubject;
                if(config.docSalutation !== undefined) inputDocSalutation.value = config.docSalutation;
                if(config.docBody !== undefined) inputDocBody.value = config.docBody;
                if(config.docValediction !== undefined) inputDocValediction.value = config.docValediction;
                
                if(config.signName !== undefined && inputSignName) inputSignName.value = config.signName;
                if(config.signRole !== undefined && inputSignRole) inputSignRole.value = config.signRole;
                
                if(config.footAddress !== undefined) inputFootAddress.value = config.footAddress;
                if(config.footPhone !== undefined) inputFootPhone.value = config.footPhone;
                if(config.footEmail !== undefined) inputFootEmail.value = config.footEmail;
                if(config.footWeb !== undefined) inputFootWeb.value = config.footWeb;
                if(config.footInsta !== undefined) inputFootInsta.value = config.footInsta;
                if(config.footSocials !== undefined) inputFootSocials.value = config.footSocials;
                
                // Estilo e Tema
                if(config.stationeryStyle !== undefined) {
                    const targetStyleCard = document.querySelector(`input[name="stationery-style"][value="${config.stationeryStyle}"]`);
                    if (targetStyleCard) {
                        targetStyleCard.parentElement.click();
                    }
                }
                
                if(config.theme !== undefined) {
                    const targetThemeCard = document.querySelector(`.theme-card[data-theme="${config.theme}"]`);
                    if(targetThemeCard) {
                        targetThemeCard.click();
                    }
                }
                
                // Opções / Toggles
                if(config.options) {
                    if(config.options.showLogo !== undefined) {
                        toggleShowLogo.checked = config.options.showLogo;
                        toggleShowLogo.dispatchEvent(new Event('change'));
                    }
                    if(config.options.showFolds !== undefined) {
                        toggleShowFoldMarks.checked = config.options.showFolds;
                        toggleShowFoldMarks.dispatchEvent(new Event('change'));
                    }
                    if(config.options.showSigLine !== undefined && toggleShowSigLine) {
                        toggleShowSigLine.checked = config.options.showSigLine;
                        toggleShowSigLine.dispatchEvent(new Event('change'));
                    }
                    if(config.options.envWindow !== undefined) {
                        toggleEnvWindow.checked = config.options.envWindow;
                        toggleEnvWindow.dispatchEvent(new Event('change'));
                    }
                    if(config.options.envSender !== undefined) {
                        toggleEnvSender.checked = config.options.envSender;
                        toggleEnvSender.dispatchEvent(new Event('change'));
                    }
                }
                
                updatePreviews();
                alert('Documento carregado com sucesso!');
                
            } catch (err) {
                alert('Ficheiro JSON inválido ou corrompido.');
                console.error(err);
            }
        };
        reader.readAsText(file);
    });

    // ==========================================================================
    // 11. IMPRESSÃO E EXPORTAÇÃO DE IMAGEM
    // ==========================================================================
    
    btnPrint.addEventListener('click', function() {
        window.print();
    });

    const btnDownloadJpg = document.getElementById('btn-download-jpg');
    if (btnDownloadJpg) {
        btnDownloadJpg.addEventListener('click', function() {
            // Identificar o elemento ativo para captura
            const selectedDocType = document.querySelector('input[name="doc-type"]:checked').value;
            let targetElement = null;
            let filename = 'documento.jpg';
            
            if (selectedDocType === 'letter') {
                targetElement = document.getElementById('a4-sheet');
                filename = 'carta_a4.jpg';
            } else if (selectedDocType === 'notepad-a5') {
                targetElement = document.getElementById('a5-sheet');
                filename = 'bloco_a5.jpg';
            } else if (selectedDocType === 'envelope-dl') {
                targetElement = envelopeDlPage.querySelector('.envelope-dl-shape');
                filename = 'envelope_dl.jpg';
            } else if (selectedDocType === 'envelope-c5') {
                targetElement = envelopeC5Page.querySelector('.envelope-c5-shape');
                filename = 'envelope_c5.jpg';
            }
            
            if (targetElement) {
                // Estado de carregamento no botão
                btnDownloadJpg.disabled = true;
                const originalText = btnDownloadJpg.innerHTML;
                btnDownloadJpg.innerHTML = '<span class="icon">⏳</span> A gerar imagem...';
                
                // Configurações do html2canvas para qualidade máxima (Escala 2)
                const options = {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    logging: false
                };
                
                // Remover temporariamente o transform de zoom que corta a captura do html2canvas
                const activeContainer = document.querySelector('.preview-container.active');
                let originalTransform = '';
                if (activeContainer) {
                    originalTransform = activeContainer.style.transform;
                    activeContainer.style.transform = 'none';
                }
                
                // Delay curto para assegurar a renderização sem zoom antes da foto
                setTimeout(() => {
                    html2canvas(targetElement, options).then(canvas => {
                        // Repor o zoom no ecrã
                        if (activeContainer) {
                            activeContainer.style.transform = originalTransform;
                        }
                        
                        try {
                            const imgData = canvas.toDataURL('image/jpeg', 0.92);
                            
                            // Criação de link temporário para descarregar
                            const downloadLink = document.createElement('a');
                            downloadLink.href = imgData;
                            downloadLink.download = filename;
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                        } catch (err) {
                            console.error('Erro ao gerar link de imagem:', err);
                            alert('Erro ao guardar imagem no dispositivo.');
                        }
                        
                        // Repor botão
                        btnDownloadJpg.disabled = false;
                        btnDownloadJpg.innerHTML = originalText;
                    }).catch(err => {
                        console.error('Erro no html2canvas:', err);
                        if (activeContainer) {
                            activeContainer.style.transform = originalTransform;
                        }
                        btnDownloadJpg.disabled = false;
                        btnDownloadJpg.innerHTML = originalText;
                        alert('Erro ao processar imagem.');
                    });
                }, 150);
            }
        });
    }

    // ==========================================================================
    // 12. LIMPAR E REPOR ORIGINAL
    // ==========================================================================
    
    btnClear.addEventListener('click', function() {
        if(confirm('Deseja limpar todos os campos de texto da carta (mantendo os contactos)?')) {
            allInputs.forEach(input => {
                if(input && !input.id.startsWith('foot-')) {
                    input.value = '';
                }
            });
            inputDocDate.value = '';
            updatePreviews();
        }
    });

    btnResetDefaults.addEventListener('click', function() {
        if(confirm('Deseja repor todos os contactos oficiais e textos de fábrica do CAMG?')) {
            loadDefaultData();
            
            toggleShowLogo.checked = true;
            a4Sheet.classList.remove('hide-logo-header');
            document.getElementById('logo-holder').style.display = 'flex';
            
            toggleShowFoldMarks.checked = false;
            letterPage.classList.remove('show-folds');
            
            if (toggleShowSigLine) {
                toggleShowSigLine.checked = true;
                if (prevSigLine) prevSigLine.style.display = 'block';
                if (prevSigBlock) prevSigBlock.style.opacity = '1';
            }
            
            toggleEnvWindow.checked = false;
            envelopeDlPage.querySelector('.envelope-face').classList.add('no-window');
            envelopeC5Page.querySelector('.envelope-face').classList.add('no-window');
            
            // Repor Estilo docex inicial
            document.querySelector('input[name="stationery-style"][value="docex"]').parentElement.click();
            document.querySelector('[data-theme="theme-verde-ouro"]').click();
            
            // Repor avançados
            selectFont.value = "var(--font-letter-sans)";
            selectFontSize.value = "14.5px";
            selectLineHeight.value = "1.65";
            a4Sheet.style.setProperty('--theme-font', "var(--font-letter-sans)");
            a4Sheet.style.setProperty('--fontsize-adjust', "14.5px");
            a4Sheet.style.setProperty('--lineheight-adjust', "1.65");
            
            updatePreviews();
        }
    });

    function loadDefaultData() {
        inputDocRef.value = DEFAULTS.docRef;
        inputDocDate.value = '';
        
        inputDestName.value = DEFAULTS.destName;
        inputDestAddress.value = DEFAULTS.destAddress;
        inputDestZip.value = DEFAULTS.destZip;
        inputDestCity.value = DEFAULTS.destCity;
        
        inputDocSubject.value = DEFAULTS.docSubject;
        inputDocSalutation.value = DEFAULTS.docSalutation;
        inputDocBody.value = DEFAULTS.docBody;
        inputDocValediction.value = DEFAULTS.docValediction;
        
        if (inputSignName) inputSignName.value = DEFAULTS.signName;
        if (inputSignRole) inputSignRole.value = DEFAULTS.signRole;
        
        inputFootAddress.value = DEFAULTS.footAddress;
        inputFootPhone.value = DEFAULTS.footPhone;
        inputFootEmail.value = DEFAULTS.footEmail;
        inputFootWeb.value = DEFAULTS.footWeb;
        inputFootInsta.value = DEFAULTS.footInsta;
        inputFootSocials.value = DEFAULTS.footSocials;
    }

    btnToday.addEventListener('click', function() {
        const today = new Date().toISOString().split('T')[0];
        inputDocDate.value = today;
        updatePreviews();
    });

    // ==========================================================================
    // 13. SISTEMA DE ZOOM E ESCALA (RESPONSIVIDADE)
    // ==========================================================================
    
    let currentZoom = 85;
    
    function updateZoomDisplay() {
        zoomText.textContent = `${currentZoom}%`;
        const activeContainer = document.querySelector('.preview-container.active');
        if (activeContainer) {
            activeContainer.style.transform = `scale(${currentZoom / 100})`;
        }
    }
    
    function resetZoomForDocType(docType) {
        if (docType === 'letter') {
            currentZoom = 70;
        } else if (docType === 'notepad-a5') {
            currentZoom = 90;
        } else {
            currentZoom = 60;
        }
        updateZoomDisplay();
    }
    
    btnZoomIn.addEventListener('click', function() {
        if (currentZoom < 140) {
            currentZoom += 5;
            updateZoomDisplay();
        }
    });
    
    btnZoomOut.addEventListener('click', function() {
        if (currentZoom > 40) {
            currentZoom -= 5;
            updateZoomDisplay();
        }
    });

    // ==========================================================================
    // 14. INICIALIZAÇÃO DA APLICAÇÃO
    // ==========================================================================
    
    envelopeDlPage.querySelector('.envelope-face').classList.add('no-window');
    envelopeC5Page.querySelector('.envelope-face').classList.add('no-window');
    
    loadDefaultData();
    updatePreviews();
    updateZoomDisplay();
    
});
