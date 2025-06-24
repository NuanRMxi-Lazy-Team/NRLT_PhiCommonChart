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
                            {text: '概述', link: '/markdown-examples'},
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
                                    {text: `扩展功能`, link: '/chart_format/extended_layer.md'},
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
                    {text: 'Home', link: '/'},
                    {text: 'examples', link: '/markdown-examples'}
                ],
                sidebar: [
                    {
                        text: 'Quick Start',
                        items: [
                            {text: 'overview', link: '/markdown-examples'},
                        ]
                    },
                    {
                        text: 'structure',
                        items: [
                            {text: 'Chart root structure', link: '/chart_format/root.md'},
                            {
                                text: `substructure`, items: [
                                    {text: `Chart information`, link: '/chart_format/chart_info.md'},
                                    {text: `BPM`, link: '/chart_format/bpm.md'},
                                    {text: `JudgeLine`, link: '/chart_format/judge_line.md'},
                                    {text: `Event`, link: '/chart_format/event.md'},
                                    {text: `Note`, link: '/chart_format/note.md'},
                                    {text: `Extend features`, link: '/chart_format/extended_layer.md'},
                                ]
                            }
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
