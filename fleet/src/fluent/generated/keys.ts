import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '68cd8a2081d64a38969b481cc7a65094'
                    }
                    'fleet-agent-expense': {
                        table: 'x_2208133_a2afleet_agent'
                        id: 'f01b252e0dd14903a91c1834300ff3ab'
                    }
                    'fleet-agent-hr': {
                        table: 'x_2208133_a2afleet_agent'
                        id: '6cff1a0c005e47d2a19a2552c0a1a2d6'
                    }
                    'fleet-agent-travel': {
                        table: 'x_2208133_a2afleet_agent'
                        id: '4b6817ebb8eb44fcaadafb0c9842e2cc'
                    }
                    'fleet-agent-vendor': {
                        table: 'x_2208133_a2afleet_agent'
                        id: '7cfc673cefb3447daad1aee3bff0d1a7'
                    }
                    'fleet-api': {
                        table: 'sys_ws_definition'
                        id: 'f98ce495718042b79a1bd5117f79a9f5'
                    }
                    'fleet-api-card': {
                        table: 'sys_ws_operation'
                        id: '1b0f3b1d085e47aeade81bf596e10fbc'
                    }
                    'fleet-api-list': {
                        table: 'sys_ws_operation'
                        id: '41e92359d8374eff8850347b911b121c'
                    }
                    'fleet-api-rpc': {
                        table: 'sys_ws_operation'
                        id: '21c02fa9d3574cfb8bb4a09c8fbe2e38'
                    }
                    'fleet-menu': {
                        table: 'sys_app_application'
                        id: '2eec5abea0b444979818e319446bf115'
                    }
                    'fleet-menu-agents': {
                        table: 'sys_app_module'
                        id: 'e4e5244b78104a0093c42d25e6fca68d'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '1c38d2a174974624879f746c8d6b6078'
                    }
                    'src_server_fleet-api_ts': {
                        table: 'sys_module'
                        id: 'a393204f2587480c908c62260ddbd17b'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '074fd1b9e2d047ad94d303bf3f56ff99'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'push_notifications'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07954d77ee46467a89d6ae0fc43b124a'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0a94d872e3414ef29b52e93ab44a03bf'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'push_notifications'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0d34cd0907264334b59c1c9581a4303b'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'endpoint_override'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '13d6d96cfe2c4bf2964aaae26bd5e611'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'streaming'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1ff24b3144a041bcaf885d48c6ce4937'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'auth_mode'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '21167b260f6844468423ed653d8fa67d'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'auth_mode'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2ee1983e43e147a5b6c16eb1f96a2562'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '374fe897526c43d3b539d43a1b766172'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3edb48e469d94aba8c431ea51ada7f26'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'status'
                            value: 'offline'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4171a93c130640e189f08580b84d32e4'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'streaming'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '438ffeebddd342888d18254565220830'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'auth_mode'
                            value: 'api_key'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '47b429efcbdf4c14baf6b122c76e3323'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'auth_mode'
                            value: 'none'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5689b99e5bf442099638fcbd9f67d5fd'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'skills'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5758ab1e71474ffe928e82547849712c'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b8d96ab094946f889937a20416b3787'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '606f4c6a87004016821eddedc8975e0e'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'protocol_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6599e71f5b6f47429e75217dd303acb6'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '696224b73df942d18b4c43f7445e696c'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'oauth_scopes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c4c10a6c27b40039be78e37e5382f8e'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '6e7ca246fd83468d920c6b32efa58843'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '79110a93f1e24b84906fa9bd074bd7d8'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'provider_org'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '87c67b9ac3ec4fa7aa47c37381476cc6'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '88e15d5ada8140459368b22eeb57de89'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'provider_org'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '89f80f79ba2d4753ae729c4fa725f4a3'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '94c4d9e52740417baa89e1e51ccba787'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'auth_mode'
                            value: 'oauth2'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '98838d6f337741c9bb00f0bbec6c2367'
                        key: {
                            logical_table_name: 'x_2208133_a2afleet_agent'
                            col_name_string: 'slug'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a28916fa8e1142ffbcc8b4d60c418e97'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'version'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a6e7c5d2980c4208880dda9d15501e9b'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'slug'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aa2399250b9f4872848d99886b7f5172'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'endpoint_override'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b09b572e72ba4e6fa9197b167279216f'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1a09cdad06e4c338f44deb37d32407e'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1a60fa43eb44fdf95342d2964b643dd'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'protocol_version'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c5b22cf1775f412f8cc3d5eecd1dc932'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'status'
                            value: 'error'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cb8f15a971154eb48909867879a01050'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'auth_mode'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd17c8fa24a5c4599af8d48f05da69eff'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'skills'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd1cf527111ac4a28a02107f39a072398'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'slug'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dcbc8f49872148a6b086233a348a950c'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'status'
                            value: 'online'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e06c19cab8ea47ffa9e6eef482658f5d'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'oauth_scopes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ec5a12f3e6dc48dd9b83e8008cfe68c6'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ee62fc8cc9fe4128bdc63daa62731fb2'
                        key: {
                            name: 'x_2208133_a2afleet_agent'
                            element: 'status'
                        }
                    },
                ]
            }
        }
    }
}
