import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'a2a-sentinel-accept-risk': {
                        table: 'sys_ui_action'
                        id: '94a82b06b7774824bf79a1256b9cb601'
                    }
                    'a2a-sentinel-api': {
                        table: 'sys_ws_definition'
                        id: 'bb97bf2aa14b47acac48f2e14e7cf06a'
                    }
                    'a2a-sentinel-api-acl': {
                        table: 'sys_security_acl'
                        id: '68e018a17fcf4dccafedfb80f50e6e01'
                    }
                    'a2a-sentinel-api-check': {
                        table: 'sys_ws_operation'
                        id: 'f7042285a8e446998971149389c4aebd'
                    }
                    'a2a-sentinel-api-run': {
                        table: 'sys_ws_operation'
                        id: '95cf2bd6bd814132b47694fe1a1f4de2'
                    }
                    'a2a-sentinel-api-status': {
                        table: 'sys_ws_operation'
                        id: 'fa4c17dd62f2406b81913691b597a7e4'
                    }
                    'a2a-sentinel-check-now': {
                        table: 'sys_ui_action'
                        id: '710739949aaf4fab8880e14dfca166f4'
                    }
                    'a2a-sentinel-menu': {
                        table: 'sys_app_application'
                        id: '159f0327d5be4b19bc87f5aa3217d606'
                    }
                    'a2a-sentinel-module-agents': {
                        table: 'sys_app_module'
                        id: '283f8a82370b4dee99ff9b1f3b08106b'
                    }
                    'a2a-sentinel-module-all-findings': {
                        table: 'sys_app_module'
                        id: 'de899fd1485c4b21b4a8ed52d1fe321d'
                    }
                    'a2a-sentinel-module-open-findings': {
                        table: 'sys_app_module'
                        id: '55bb7f93fb4245479c8a7b3339bed8f9'
                    }
                    'a2a-sentinel-module-probes': {
                        table: 'sys_app_module'
                        id: '30029c2726e94d66a8c6a63899a8fb8e'
                    }
                    'a2a-sentinel-module-snapshots': {
                        table: 'sys_app_module'
                        id: 'a10b2112378d4feeac104371bd381003'
                    }
                    'a2a-sentinel-prop-failures': {
                        table: 'sys_properties'
                        id: '5b4bf5aa8e58402eb04e32824570cd22'
                    }
                    'a2a-sentinel-prop-latency': {
                        table: 'sys_properties'
                        id: '9103c01b2edc4f089f0af94788e1db63'
                    }
                    'a2a-sentinel-prop-llm': {
                        table: 'sys_properties'
                        id: 'e240d5e461794ff1bbe2fba09fd6a7de'
                    }
                    'a2a-sentinel-retire-orphan': {
                        table: 'sys_ui_action'
                        id: '2dc56ffd38324832ab916642e53adeb6'
                    }
                    'a2a-sentinel-run-cycle': {
                        table: 'sys_ui_action'
                        id: '7748f5a764fb4a6f97b32f97c280820c'
                    }
                    'a2a-sentinel-si': {
                        table: 'sys_script_include'
                        id: 'ebb7081180c84254bf1fc31565ced816'
                    }
                    'a2a-sentinel-watch-job': {
                        table: 'sysauto_script'
                        id: '8f6e38d412d84bf5a03248f467546fd0'
                    }
                    'acl-agent-read-viewer': {
                        table: 'sys_security_acl'
                        id: '9ff7c68437f94f279f22cc31cf595cd3'
                    }
                    'acl-finding-read-viewer': {
                        table: 'sys_security_acl'
                        id: 'fe02511886584c319242f16048b15ed5'
                    }
                    'acl-probe-read-viewer': {
                        table: 'sys_security_acl'
                        id: '1d3a282e01784a3aa1d5ed388a2e6916'
                    }
                    'acl-snapshot-read-viewer': {
                        table: 'sys_security_acl'
                        id: '3de3c13decc544818258f9f05ddd317a'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '813fc33bd98f4e21a103c9a57b203817'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'a53f6c8c6b0c451d9f0596f9a8ff5028'
                    }
                    'watched-contoso-expense': {
                        table: 'x_snc_a2a_sentinel_agent'
                        id: '92d8574041e5474e9b996628f3c21993'
                    }
                    'watched-contoso-hr': {
                        table: 'x_snc_a2a_sentinel_agent'
                        id: '21101981d25c461f836d0172eaed1a00'
                    }
                    'watched-contoso-travel': {
                        table: 'x_snc_a2a_sentinel_agent'
                        id: '54064a5d9491478bbc0ee0ee770aa01c'
                    }
                    'watched-contoso-vendor': {
                        table: 'x_snc_a2a_sentinel_agent'
                        id: '0cf3f56524b54ef780b6b84278ba6255'
                    }
                    'xs-exec-llmclient': {
                        table: 'sys_scope_privilege'
                        id: '50bdc47c701448289eb6059a0b02628c'
                    }
                    'xs-read-ai-asset': {
                        table: 'sys_scope_privilege'
                        id: 'b78e23e669964ee99adfe9cbee80864c'
                    }
                    'xs-read-ai-ci': {
                        table: 'sys_scope_privilege'
                        id: '3846d1c597db479a94807735cfb0d3dc'
                    }
                    'xs-read-aia-agent': {
                        table: 'sys_scope_privilege'
                        id: '9eb8abb333cf4771935cb236f254104f'
                    }
                    'xs-read-aia-ext-card': {
                        table: 'sys_scope_privilege'
                        id: '6e372444e40c4dbba28c0219d3c0390e'
                    }
                    'xs-read-aia-ext-config': {
                        table: 'sys_scope_privilege'
                        id: '6b07b2be0dee4aa99798288759370e78'
                    }
                    'xs-read-aia-ext-discovery': {
                        table: 'sys_scope_privilege'
                        id: '5c67208c268f4b4aaebf502d0092079d'
                    }
                    'xs-read-aia-ext-provider': {
                        table: 'sys_scope_privilege'
                        id: '39604f477f97473fa82bbc2783f0ab96'
                    }
                    'xs-read-audit-delete': {
                        table: 'sys_scope_privilege'
                        id: '02cbfd5ca22744c6afe48ab6376631d0'
                    }
                    'xs-read-cmdb-ci': {
                        table: 'sys_scope_privilege'
                        id: '91de54a0f1464fd0b7f547ceaec94dab'
                    }
                    'xs-write-ai-asset': {
                        table: 'sys_scope_privilege'
                        id: 'e581af70a2a44ba48bca8ef2d017f4b1'
                    }
                    'xs-write-ai-ci': {
                        table: 'sys_scope_privilege'
                        id: 'a1053b2b6b14409cbce0ccfd416f5fc0'
                    }
                    'xs-write-cmdb-ci': {
                        table: 'sys_scope_privilege'
                        id: '60df9c2f8b16479a83d43f324dc33a1d'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '013a1aa525ad4122995a733422b25641'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'fetched_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '024dd7a8f6b14e4bae6a9d966349ef71'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'skill_added'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0295d4f177be43cb9a7e509e467235a9'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'priority'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0348d3480c5f48eb9de5ad32ec9d0e62'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'skill_count'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0479ff1c3c8b414d9ba9dd1177ed4bee'
                        key: {
                            sys_security_acl: '3de3c13decc544818258f9f05ddd317a'
                            sys_user_role: {
                                id: '4524e276c03c4803b131fe456ac34d74'
                                key: {
                                    name: 'x_snc_a2a_sentinel.viewer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '047f121e506440f1b01e783a273cab7a'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'affected_asset'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '06e0188bc4ac46a293b763ca2429bbab'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'after_snapshot'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07838a08ac3e409381443cd053a70d20'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'sn_agent'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '089aca4fd3d443d39e93efbb7873b6ce'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'skill_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0934ac71df7044e2929d55d4cb490792'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '09e91303b019461a8a9c2dac5cf63dd8'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'severity'
                            value: 'info'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0a2be95b48a348279d88e18c2bee6753'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'insecure_transport'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '0b5454e9874b4bc2a0f079d9c2923c20'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            caption: 'Health Probe'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0c2f5aeb91974b83855431ff9d049c48'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0e2b9bb05a8344938a7f41859320896b'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'ai_summary'
                            position: '13'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '0f015745feee40b4996a03c0b80c1381'
                        key: {
                            sys_ui_action: '7748f5a764fb4a6f97b32f97c280820c'
                            sys_user_role: {
                                id: '6ebf2c32147b4b648153d592003de30e'
                                key: {
                                    name: 'x_snc_a2a_sentinel.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0ff0cdd68c4f42d291c956099d0a64b1'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'orphan_ai_asset'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '101965ca2d774a33a10adc30e88ab57e'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1094ab67b13d4df0a824d30bed0bcea0'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'card_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '11941be1ca394021b75843e4820b11f6'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'agent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '12c0d79f6ccc48e193b504665c343f29'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'ai_ci'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '12d256df15334e778be43feb156bb640'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '153f04f6f04e468c81d89d3537830b20'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '15b1218c24fc41148f6b503d515fe6fc'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'agent'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '15d66fcf16644c1699e470513600653c'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'source'
                            value: 'manual'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '17c0be9437db4172b644ec3c5da6b97e'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'endpoint_host'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '1826e57fa060460ca6a3366e29fdd9ae'
                        key: {
                            list_id: {
                                id: '7503a8963a82469c811f10a8172caa27'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'sys_created_on'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '1cfe1a95051a499cb042e0d187dbebb5'
                        key: {
                            sys_ui_form: {
                                id: '2e66ef468fce4a1e9cd9da217b4ad018'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1d6f780179ff4afca2f2a606f6fa9c33'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'source'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1e042a639cb54113acace67942f1cc12'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_snapshot'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1f517d2da2154f73b350c19bdf5625c7'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'auth_removed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2005bd89e9fc4b6ebe6c343df4c2bb08'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'card_hash'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '201dbaece5884399b9682dbc46c8bc4d'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'card'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '21003571e7074b12a0cd7cf2433594a5'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '228172b404624724b1441264acc92219'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'agent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '234f91c3fa6e472c8bd0b45a73bb6674'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'fingerprint'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2351b29f001a49cfb79b7eb4e0451d2c'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'endpoint_host'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '23d6c3139b3047c6b8570a61de9d8b79'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'health'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2562e6bafaa746bf83b8ec4959efff6d'
                        key: {
                            sys_security_acl: '68e018a17fcf4dccafedfb80f50e6e01'
                            sys_user_role: {
                                id: '6ebf2c32147b4b648153d592003de30e'
                                key: {
                                    name: 'x_snc_a2a_sentinel.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2590f97b5714464a9d923d266e9f42e3'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'endpoint_host'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '26ca5f57ad2346d39c63a9a9752994f8'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '282b474e42644cca92b9a9f3b1fca907'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'auth_summary'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '284e182e75dc47b8b67193b528e90842'
                        key: {
                            sys_ui_form: {
                                id: 'f13583cdd17d46189e76e4cf610af9f4'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '28b7c58a57f9472a9a0497778b0ea289'
                        key: {
                            sys_ui_section: {
                                id: '719988fcdb36462bb4ff2bf874b096cd'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'before_snapshot'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '28bfe14d3c544cf3b27668d8b8e15c66'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'short_description'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '28c562597a87486ab40df62198621e63'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'endpoint_host'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '295497a9d41549a98ed451199d8f0175'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2b28cf9c35384e5198bda38c83e594ed'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'card_url'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '2b2b66239223467ebda153de5966e3a9'
                        key: {
                            list_id: {
                                id: '153f04f6f04e468c81d89d3537830b20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'agent'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '2c61f96f383d425183905458d6cba7e7'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '2e66ef468fce4a1e9cd9da217b4ad018'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '2fdbd348be694319908acc9ed216e957'
                        key: {
                            list_id: {
                                id: '7503a8963a82469c811f10a8172caa27'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3070733097694f08b9d6aea9d115970b'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'protocol_changed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3118885c180e4abfa6f3a10f8ab1e9ce'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'agent'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '33cf31ae569d4b60baf83dd797d7e068'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '344e416e53634b248d05e00060a0b9bc'
                        key: {
                            list_id: {
                                id: '7503a8963a82469c811f10a8172caa27'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3483e44596334fb0929c1f0d8a02a7ee'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'before_snapshot'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '34a25bf0f3134b2a9b47129653235139'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '36da1c28c0644c8b8c1c48061182012f'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'unreachable'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '37a4c56d52414ba794738fa1e8b95756'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'sn_agent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '37efd3f6baef44d1b3095b107ac68fce'
                        key: {
                            list_id: {
                                id: 'eae13a1f439e437089d35bfe7cc152c2'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'http_status'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '38c7dfb8553b4994ae596f74e818090e'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '38eba51b4d514e87af3a599992f9b845'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'health'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3a03bdb515e94e3cba68ba86c1cc6fb8'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'affected_ci'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3a50582c39294e79a99b895dbd95575e'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3bd400e1db6345eb99a9fdbf0b807122'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'active'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3ce1a998196e417da62b93128551a20b'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'last_snapshot'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '3de8496c72ca480884808681ec1acaba'
                        key: {
                            list_id: {
                                id: '153f04f6f04e468c81d89d3537830b20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'fetched_on'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3f3fbf1d185d46dea9a78c54636a359d'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'capability_changed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '3f4923d44a2d4a029543735fb7f9d9b6'
                        key: {
                            sys_ui_form: {
                                id: 'da9376d19cba4736b85cecbb1601c898'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '719988fcdb36462bb4ff2bf874b096cd'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '42b2af6eb5ce42e99fdd4ee31424514e'
                        key: {
                            list_id: {
                                id: 'eae13a1f439e437089d35bfe7cc152c2'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'latency_ms'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '43870c97dd8e495dbdf91db363469acf'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '43ad2bb5427944b6b51f28e0ac79cf17'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '43e56235cb5f464c88fed75e23ab2891'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'risk'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '4524e276c03c4803b131fe456ac34d74'
                        key: {
                            name: 'x_snc_a2a_sentinel.viewer'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '455f02b47733458f834463d7f02173d7'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45701051a8cd4e9b8b5ef8b4bc406b5a'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'last_http_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '458b5b561fa241fb928b42e4277063ef'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'agent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45d64b1adee944de80812b653f504d67'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'card_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '47680068c76e42d2a2a020d50ef679e3'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            caption: 'Finding'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '49a6943b0af84050aa03f1e483eca3f7'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'scope_expanded'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4c7e6b061651415bb9baabc5f3a78f7f'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'latency_ms'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4e6db517484d41fcab7b49148424fa7a'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'health'
                            value: 'healthy'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4f65a079e8c04baa940af37b871fbe71'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'source'
                            value: 'registration'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4f71cfdb29544aecb4d2d32e0cf026ca'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'ai_ci'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4f8c30883b134b85a28e8369f7d3d0d0'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'card'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4fbd6f48a38c401aa952eeafc1695cbe'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'auth_summary'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '50147e48d4114b0486ccf3e3ab89a6aa'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'unversioned_change'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '514e0477b1cf40d6b69a248a6e7dfcad'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '51c1c4646ab24690972c5728b260ca5d'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'skill_removed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '52085f361d48402d9b5ed9c4cc6c8714'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'agent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5231f52168854e79af385f06377b4b37'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'sn_agent'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '52708b00fc0b4655b1ff482c6566073d'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'no_auth_declared'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '535b36d7d9d14e47a49fdd358eece360'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'current_hash'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '53bde8a881034f3696328e6ba90c11e9'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'health'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '54747080190044128f9d315ff1d74504'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity.xml'
                            position: '16'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '54ccb55772e142a2aae12f0d7f736cb1'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                            value: 'info'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '554d606683724553af523e549f72438b'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'ai_summary'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '55afa11ee8c043e18e69fb1dbd9d31b2'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'card'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '589dfaec04614f2d8c3f1eb46e4f0cd0'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '59083036de2340df9f1015e39a7d967f'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            caption: 'Current Agent Card'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a08f707852741f6846bb34ea0d9c4bf'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5bedeecd7d6f4eebbbf2ba831f396e68'
                        key: {
                            sys_ui_section: {
                                id: '719988fcdb36462bb4ff2bf874b096cd'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'fingerprint'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e5e43ce8a884756a2d6dbcd3f29e365'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'latency_ms'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '5e7137361c3048cfb88ece6cc3b7dbe7'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5ec2482a124e432ebd3c74fa1bd595d1'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '5ff0cfa751d5431d85d725204c79d414'
                        key: {
                            list_id: {
                                id: '153f04f6f04e468c81d89d3537830b20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'card_version'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6042ae244a8c414eb724ffcd1288f9ec'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'auth_summary'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '60d5d3b33e5540c6b615990a83b0f6aa'
                        key: {
                            list_id: {
                                id: 'eae13a1f439e437089d35bfe7cc152c2'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'changed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '612312d3a80d44088cee620606754a80'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                            value: 'medium'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6235791a43fb481ebce9a3b799b58ba8'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'evidence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '623a0d50bf5e471287716de0227588d0'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'legacy_card_path'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '636c45ad08b1481fb30d9fb42ca680b5'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                            value: 'high'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '66f7e53bf43a4a6ca79ba6d80f1f782e'
                        key: {
                            list_id: {
                                id: '153f04f6f04e468c81d89d3537830b20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'endpoint_host'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6710df6cf8964c5d8924cb2fb922a4f1'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'auth_changed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6753c0fc1995469b9c3487777d88f7de'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '67ff97b7eb044d06bf9fbb78e619bc93'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'affected_ci'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '691882b5ea2a438cb414b55e9e6f4a73'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '6b2a7944fb9a425ea916ade7596d1457'
                        key: {
                            sys_ui_form: {
                                id: 'c71c51341e7a48a4bb49d7f2fdba7f26'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6c320905c3de4b45b0d353a77f5fa724'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'source'
                            value: 'live'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c94da14d8304f53b960695b6a4a391f'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'last_checked'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '6c99783920624770b6ee35bf37047346'
                        key: {
                            list_id: {
                                id: '7503a8963a82469c811f10a8172caa27'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6d264a28cad84f8791658c76442b6c61'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'probed_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6d8c12155cba43049a8730a85dded4dc'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6d90316b77a54c6e9d33721308223a2d'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'protocol_version'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6de3cc0a816e474a93c94d797c6f2f94'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '6ebf2c32147b4b648153d592003de30e'
                        key: {
                            name: 'x_snc_a2a_sentinel.admin'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6f4da1df705c4e7a910d08ef8330a566'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'after_snapshot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '719988fcdb36462bb4ff2bf874b096cd'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            caption: 'Evidence'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7265f7c527d04466bb5e5f907434333c'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'auth_summary'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '72abbc8173d34753b775f12e841f5b56'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_snc_a2a_sentinel_agent.x_snc_a2a_sentinel_finding.agent'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '740a0adf261d4905a15f06f16ab7f82a'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'probed_on'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '74924a5db4c94b3596d8338a398cce40'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'changed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '74eb35eb3bf4431b8896d25f6cada59c'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'health'
                            value: 'degraded'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '7503a8963a82469c811f10a8172caa27'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7559ef1439244a009b597fac9be3303e'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'outcome'
                            value: 'invalid_json'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '755a4573bc7c4270b8c10683aaddd430'
                        key: {
                            sys_ui_action: '94a82b06b7774824bf79a1256b9cb601'
                            sys_user_role: {
                                id: '6ebf2c32147b4b648153d592003de30e'
                                key: {
                                    name: 'x_snc_a2a_sentinel.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '75b81cbf38d341129c6275636ec816d2'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'fingerprint'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '75dee7d339694877a8a2dffb679e991f'
                        key: {
                            list_id: {
                                id: '153f04f6f04e468c81d89d3537830b20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'card_hash'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '76e58cc5784849088ef8729e6453d090'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'changed'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '775b85a12540493d85801d47a35e93bc'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'outcome'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '777b9c557dbd44d9a04e4c81175928df'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'recommendation'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '78d1c616dd1147229d53d30c84d1c704'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'card_version'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7a2e17aacca042839b4388c2aa34dfe2'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'error'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7b295741ffa9494e872d8849762359ea'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'description'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7bacb1232b4f47e1af3a3e69b171649b'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'http_status'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7dab81cc7cb84e229e5acc47e5762f36'
                        key: {
                            sys_ui_section: {
                                id: '719988fcdb36462bb4ff2bf874b096cd'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '7ddba27c77b44036b31ff6860a5625bf'
                        key: {
                            sys_ui_action: '2dc56ffd38324832ab916642e53adeb6'
                            sys_user_role: {
                                id: '6ebf2c32147b4b648153d592003de30e'
                                key: {
                                    name: 'x_snc_a2a_sentinel.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '7e3765a36fdd43a2a19e09deb7247746'
                        key: {
                            list_id: {
                                id: '153f04f6f04e468c81d89d3537830b20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'auth_summary'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7f49c763b4304ebd8b273a1ed146eee3'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'source'
                            value: 'servicenow_external'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '7fb15c0ba0504f32bc66e6515e10bb83'
                        key: {
                            list_id: {
                                id: 'eae13a1f439e437089d35bfe7cc152c2'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'outcome'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '811ffdca2f104de0a296044a24011e0a'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'consecutive_failures'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '827be71f83a3441990dcf598eb65eef6'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                            value: 'low'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '837552f2f33d45eebac7ed887637485b'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '83bf9820b5094d919edf310d531b25df'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '85cb4d5476f248549d4c807c840cecb5'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '86a19054bbb748b2a106f4ae3358146c'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'http_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '87befa789a6f45239e439510c43b8240'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'outcome'
                            value: 'http_error'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8b3514d0212440c7a4e9b7e35fa59964'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '8bdd2229b81f45e7bc1986c52e630e17'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'last_checked'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8cb55cb32dcf4e53bdb0850733e04ad0'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_latency_ms'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '8ce6ba19080b4ebd8e41a6c92bd29653'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8e8390d81bca4f36b8928452e5356f8e'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f38395a97d24107b205157bd3eda4e9'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'evidence'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '90193a74979f4d27846f0464e1e4782d'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '906baac93e5f4160824c42a0d03b6dee'
                        key: {
                            role: {
                                id: '6ebf2c32147b4b648153d592003de30e'
                                key: {
                                    name: 'x_snc_a2a_sentinel.admin'
                                }
                            }
                            contains: {
                                id: '4524e276c03c4803b131fe456ac34d74'
                                key: {
                                    name: 'x_snc_a2a_sentinel.viewer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '90848f53da6b401bbd02675655da3ba1'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9205c66355024cecbea4c1e7ef841615'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'invalid_card'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '9297aab859014eafa7962113b6b94723'
                        key: {
                            list_id: {
                                id: 'eae13a1f439e437089d35bfe7cc152c2'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'probed_on'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '93b32cdb72d24b8283bd6ea3312a0ef6'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'card_version'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '95294cc8bff04ca0ae8c16830cd38b11'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '957218e8f0684bceb3d5e50f87823c56'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'protocol_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '957c75a6412b44cd989f63fb7a07f340'
                        key: {
                            category: 'x_snc_a2a_sentinel_finding'
                            prefix: 'A2AF'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '96dac53d8379427ab135e2eec648bc67'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'probed_on'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '97459415ce994502bf63a61ce5f52682'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'skill_count'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '97f6b6a6b8a941cfa34c9dd318de59e1'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'skill_modified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '98df82cfdd2b437b92f338db9a32fbd5'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'auth_summary'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '9b4b8b04c30d4258a8cc17ca105f7ffc'
                        key: {
                            list_id: {
                                id: 'eae13a1f439e437089d35bfe7cc152c2'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'agent'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '9c9ef32b633043fd810b53d0813d119e'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'endpoint_host'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9ce67b9bf3e5418eacaa0c264e39e670'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'card_hash'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d01db5b27af4318ab46b55b2084a2db'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'outcome'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d2bcb07e6724aac8c135a7cdd686c4b'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'source'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9edc3cb654614d709f2ba4f0d3caeff3'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'health'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9ee1862636434644b4b968d3f7b522bc'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f2756e4f4a5496e893f2b8e3f50cb55'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'latency_ms'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9fa1b061b28d49f18c5332c771d24d7e'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'a1f8fcc83f7c4082ab52488e57c7a7c2'
                        key: {
                            sys_ui_action: '710739949aaf4fab8880e14dfca166f4'
                            sys_user_role: {
                                id: '6ebf2c32147b4b648153d592003de30e'
                                key: {
                                    name: 'x_snc_a2a_sentinel.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a1fbf3bdbe3045d09491bed539a6fe9b'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a55d634f7348438088b16ce83027d9aa'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'card_version'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a71e0f6ca35a45bc8d04dd180833367f'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'auth_downgraded'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a7553c972734474fbcfb3342d06abef4'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_snc_a2a_sentinel_agent.x_snc_a2a_sentinel_probe.agent'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a82482f9f35b425ba37e243bd4125548'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'card_version'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a839dbbb7d0d4865b6232b351ac3dbfa'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_snc_a2a_sentinel_agent.x_snc_a2a_sentinel_snapshot.agent'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a83a4643ebd34d0f84856ba8e17f1977'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'outcome'
                            value: 'invalid_card'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a885f8ac18124cfebc3b30e358df8b82'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a8f6894b95d346e2b0307069af4f3d66'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ac52f27b28c54e0e9e21649b11186abe'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'fetched_on'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'aeb5eac4c93a4cfd8d2f7546362534ad'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'card_hash'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'aeb9ecba6d0b41f8b7886efdd3fdb0bb'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'health'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'af0fea7e30de4d949609f58ec2c33c0f'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'card_url'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b0754bc1522347b6a3ef0a20424bc91a'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'recommendation'
                            position: '14'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b104ee00f37847ddae0807d86950581f'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b13417dc2e6a4c5fa70baa0ec62b81e1'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                            value: 'none'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b1c8278447ad4a839e24823ffb3788e8'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'protocol_version'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b4eb5e3031474ab4bf5d693cbde72126'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'ai_summary'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b61a991bb97648b49b7ce614b5d7f7d3'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'recommendation'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b757073455c2452786996d8e4c11f907'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'state'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b77b7fa27e75434aa0b4d3978731629d'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'protocol_version'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b7dd85716e434dda9156cf13545e9090'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'severity'
                            value: 'low'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'b8db833655414f3fb06ab6af55e82a93'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            caption: 'Card Snapshot'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b9fb3fc9598640d7baf4e140902fa83a'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'last_snapshot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bbb37d8e587d422fb93f59c55e91050d'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'endpoint_host'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bdc76e2a01b14ef3aa9c8106d27719f8'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'card_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bf3fdc7e9bc342d89849b582ae99a89e'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'before_snapshot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bfcb5fe68ec9466d8b4b5061a3871220'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c164c770a3944735b0370b76e59c7722'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'outcome'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c2225ad32a4a45e0bedd0f3a4431f795'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c243897f423344a1bf3c50fef1745d61'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'severity'
                            value: 'critical'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c284a2b60fb647d28683de05716ae475'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'card_hash'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2ec8b4fc449482d9d6994da91568f61'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c3790f52b34848919f74ebb85cf3fbba'
                        key: {
                            sys_ui_section: {
                                id: '719988fcdb36462bb4ff2bf874b096cd'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'evidence'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c42d9053a2c64469af4b4f39af6fc4e5'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'http_status'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c442d397c55244cbb1325dd5312cd560'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c5b43ad0b1ff46ae86439d8ec48bf02c'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'skill_count'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c66ab68d26c94e08a36793866a918858'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'c71c51341e7a48a4bb49d7f2fdba7f26'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c7ee8ec899e24c4b89adf023346d8537'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c8e4beef042e4f1aabac2ec462168590'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'card_version'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c8e57f388f9343319f998ec6dc5c0443'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'severity'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c9ea64a6677b4c629e083e8f31fd4643'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'outcome'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c9f7d1dcf2fc495aba0f9ccc04712951'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'error'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cac4a565131a4eef9a34e5bb1dc104c9'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'consecutive_failures'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb1adf62481c4c139974d84cd8ea04cf'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'last_checked'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cb425268d9924b7d8dc534c6f6c7178e'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'health'
                            value: 'down'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb52466f36a6436ebdee6d7625b944b3'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'skill_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'cbbc0d3a7c0f4244856d1b41ebcef0f5'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cc54a713103d4d63abf6eddbadfe989e'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'card_hash'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ccecb7e380a84f6ca47b6a1b09e45ae1'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'agent'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'ccfd7777671943be864f075c7060eaa0'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ce2e361f19104cb5be61de799d9f84fc'
                        key: {
                            sys_security_acl: '1d3a282e01784a3aa1d5ed388a2e6916'
                            sys_user_role: {
                                id: '4524e276c03c4803b131fe456ac34d74'
                                key: {
                                    name: 'x_snc_a2a_sentinel.viewer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ceafb607fe1f46cf8f4db616e826a447'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'fetched_on'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cf06eff648a049408e962fb29013b9ac'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'last_latency_ms'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd228f139e47a42ea9669702e7fc37597'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'error'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd446bd721e8a4039a45c4dda4a844cac'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'affected_asset'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4a47fcdfcab44bdaa293836ee16dfa6'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'changed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd4bcd711ab5b456d96e1cb3c72276487'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'outcome'
                            value: 'unreachable'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4d49b3479ed42dea77a5b4911d56792'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'affected_ci'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd6e91d0eece046d9b9fa47ab8d1bd310'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'protocol_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd84f45b66c304a18aee3bd014e48bd5f'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'd92a86f1d7694b3e92403d847c7685f9'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'risk'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'da9376d19cba4736b85cecbb1601c898'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'db5f0b098a124afda6b072e4578b3c7f'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'auth_summary'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'dc8bae29c3344913bf0cbf683556932f'
                        key: {
                            list_id: {
                                id: '7503a8963a82469c811f10a8172caa27'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'agent'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dc97e862e1a04ad6bbbe5e70d7ea120f'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'severity'
                            value: 'medium'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ddffc06bb1f946a2b6c972cd5c2ced70'
                        key: {
                            sys_ui_section: {
                                id: '0b5454e9874b4bc2a0f079d9c2923c20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    caption: 'Health Probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'agent'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'df74b8b75deb4e238a8ccbb5686a3ce7'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'consecutive_failures'
                            position: '13'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'df8b4de0996b4a399ad36160490da69c'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '14'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'dfba6a2f6b2a4cb790cddcaad4f7b6b4'
                        key: {
                            list_id: {
                                id: 'eae13a1f439e437089d35bfe7cc152c2'
                                key: {
                                    name: 'x_snc_a2a_sentinel_probe'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'error'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dfc302f5709c4a96bf8b952acc60596f'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            value: 'endpoint_changed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e1018ff68c2f46ed9e3a5e853997ae61'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'e17f3480d86a4385919d1afb26d730b4'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e26f321208ea43a2aa17a6648f5a15f7'
                        key: {
                            list_id: {
                                id: '7503a8963a82469c811f10a8172caa27'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e2870d0c148e4b8eac61ab317e9b906e'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'work_notes'
                            position: '15'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e3e95e46f0b94df7860d0d639a426c44'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'last_latency_ms'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e57dd3bad5cd46eb9cdac475d32fdc6a'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'current_hash'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e813314092cd4f2d95045d084055aa69'
                        key: {
                            sys_ui_section: {
                                id: '719988fcdb36462bb4ff2bf874b096cd'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ea15708504174c3eaadbb2c4943b0848'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'endpoint_host'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea79940564924d3c8b7ad053b59fde67'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'skill_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'eae13a1f439e437089d35bfe7cc152c2'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eb14df4695bd4e7f880acebb73800aa0'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'severity'
                            value: 'high'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'eb75894d715d4c10871d57c9ee6e4175'
                        key: {
                            list_id: {
                                id: '153f04f6f04e468c81d89d3537830b20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ebfcce4d8ca04a60b9128ef90b0316db'
                        key: {
                            sys_security_acl: '9ff7c68437f94f279f22cc31cf595cd3'
                            sys_user_role: {
                                id: '4524e276c03c4803b131fe456ac34d74'
                                key: {
                                    name: 'x_snc_a2a_sentinel.viewer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ec923a8d116e4e55a4b008cb263f6fdf'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_checked'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'eef06bf472fa467eb9812cd17f59ffd4'
                        key: {
                            sys_ui_form: {
                                id: 'c71c51341e7a48a4bb49d7f2fdba7f26'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'ef05592217314887b7febbf064169092'
                        key: {
                            sys_ui_form: {
                                id: 'da9376d19cba4736b85cecbb1601c898'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f0622499ea1242eebc94902763f19228'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'f13583cdd17d46189e76e4cf610af9f4'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'f1aa3e01f7fc4ce681171de21f11ddaf'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                            element: 'finding_type'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f251cccc74c64e2db38eba2c0f7910b0'
                        key: {
                            name: 'x_snc_a2a_sentinel_finding'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'f3a0677084dc4c3cb1293f71c36cb142'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'last_latency_ms'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f4a882243beb4d1bad33a455f80eb824'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_http_status'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f4b4c07708b84ae0a047e406c5d87295'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'finding_type'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f4d16ce4c0774ec3b9a5174a9a14f7ca'
                        key: {
                            sys_security_acl: 'fe02511886584c319242f16048b15ed5'
                            sys_user_role: {
                                id: '4524e276c03c4803b131fe456ac34d74'
                                key: {
                                    name: 'x_snc_a2a_sentinel.viewer'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f4d922cb23bd4ae69a17594e5c0dc4f0'
                        key: {
                            sys_ui_section: {
                                id: '59083036de2340df9f1015e39a7d967f'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Current Agent Card'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'skill_count'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f596666b4cb043b08df1a93866dd7f5a'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'ai_ci'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'f5eb2276c1994dd695d224cb68b42b78'
                        key: {
                            list_id: {
                                id: '7503a8963a82469c811f10a8172caa27'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'finding_type'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f9056444c8b049afb19d8c5978b4b2b4'
                        key: {
                            sys_ui_section: {
                                id: '719988fcdb36462bb4ff2bf874b096cd'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f9f945c9921a4d02860aae3530496e88'
                        key: {
                            name: 'x_snc_a2a_sentinel_probe'
                            element: 'outcome'
                            value: 'ok'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fab759ebd6b8422ca7f2afe137ff0e94'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'affected_asset'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fabdf777729a4191b08a9091b3a48e3d'
                        key: {
                            name: 'x_snc_a2a_sentinel_snapshot'
                            element: 'card_hash'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'fadce760c947438285d515449d07dfda'
                        key: {
                            list_id: {
                                id: '38c7dfb8553b4994ae596f74e818090e'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'auth_summary'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'fb5c9f1628004ee0892fd10f4e09efa6'
                        key: {
                            list_id: {
                                id: '153f04f6f04e468c81d89d3537830b20'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'skill_count'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fbb073818b5f487890e5d68e282ddb41'
                        key: {
                            sys_ui_section: {
                                id: '719988fcdb36462bb4ff2bf874b096cd'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'after_snapshot'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fc81ce61ad124c1796cd0605b0a92ded'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'last_http_status'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fcd1e26ead8b4b3e8ded973192851c3b'
                        key: {
                            sys_ui_section: {
                                id: '47680068c76e42d2a2a020d50ef679e3'
                                key: {
                                    name: 'x_snc_a2a_sentinel_finding'
                                    caption: 'Finding'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'agent'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fe9006018b394629a9735c5de623368e'
                        key: {
                            sys_ui_section: {
                                id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                                key: {
                                    name: 'x_snc_a2a_sentinel_agent'
                                    caption: 'Agent'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'feb6b86e72744a659983e6d7f9d733c7'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'risk'
                            value: 'critical'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ff40a691dcae46e98781c381629cb113'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            element: 'health'
                            value: 'unknown'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'ffa6b75374ad4b54acbb175ce9bef9cc'
                        key: {
                            name: 'x_snc_a2a_sentinel_agent'
                            caption: 'Agent'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ffbb739704da4610b5d83f5123b91eea'
                        key: {
                            sys_ui_section: {
                                id: 'b8db833655414f3fb06ab6af55e82a93'
                                key: {
                                    name: 'x_snc_a2a_sentinel_snapshot'
                                    caption: 'Card Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'protocol_version'
                            position: '7'
                        }
                    },
                ]
            }
        }
    }
}
