import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "PhiCommonChartDocs",
    description: "PhiFanmade Common Chart Docs",

    locales: {
        root: {
            label: '简体中文',
            lang: 'zh-CN',
            themeConfig: {
                nav: [
                    {text: '主页', link: '/'},
                    {text: '示例', link: '/markdown-examples'}
                ],
                sidebar: [
                    {
                        text: '快速开始',
                        items: [
                            {text: '前言', link: '/markdown-examples'},
                        ]
                    },
                    {
                        text: '结构',
                        items: [
                            {text: '谱面根结构', link: '/chart_format/root.md'},
                            {
                                text: `子结构`, items: [
                                    {text: `谱面信息`, link: '/chart_format/chart_info.md'},
                                    {text: `BPM`, link: '/chart_format/bpm.md'},
                                    {text: `判定线`, link: '/chart_format/judge_line.md'},
                                    {text: `事件`, link: '/chart_format/event.md'},
                                    {text: `音符`, link: '/chart_format/note.md'},
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        en: {
            label: 'English',
            lang: 'en',
            link: '/en/',
            themeConfig: {
                nav: [
                    {text: 'Home', link: '/en/'},
                    {text: 'Examples', link: '/en/markdown-examples'}
                ],
                sidebar: [
                    {
                        text: 'Examples',
                        items: [
                            {text: 'Markdown Examples', link: '/en/markdown-examples'},
                        ]
                    }
                ]
            }
        }
    },

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        socialLinks: [
            {icon: 'github', link: 'https://github.com/NuanRMxi-Lazy-Team/NRLT_PhiCommonChart'}
        ]
    }
})
