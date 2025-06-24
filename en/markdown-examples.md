# Chart File Format Overview

This page provides a detailed introduction to the basic structure and technical specifications of PhiCommonChart chart files.

## File Packaging Format

PhiCommonChart uses **Protocol Buffers (protobuf)** as its file packaging format, which offers several advantages over traditional JSON:

- **Higher compression efficiency**: Reduces file size significantly
- **Faster parsing speed**: Binary format ensures better performance
- **Strict type checking**: Ensures data integrity

All PhiCommonChart chart files use the `.nrc` extension.

## File Content Structure

Each `.nrc` file is a self-contained chart package that includes all resources required for gameplay:

- Chart data (judge lines, notes, etc.)
- Audio files (background music, hit sounds, etc.)
- Image resources (background images, judge line textures)

This integrated packaging approach ensures chart completeness and portability.

## Compatibility Level System

To help players choose compatible simulators, PhiCommonChart defines a detailed compatibility level system. If a game engine's compatibility level is lower than what the chart requires, users should be warned accordingly.

| Compatibility Level | Name                      | Supported Features                                                                                                                                    |
|---------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **0**               | Official Chart Compatible | Supports only basic features. No RPE extensions (e.g., negative alpha) supported                                                                      |
| **1**               | Basic Extensions          | Supports some RPE features: negative judge line alpha, cover effects, layers. Does not support custom textures, extended events, or control functions |
| **2**               | Advanced Extensions       | Supports most RPE features, but excludes extended event layers and various control functions                                                          |
| **3**               | Fully Compatible          | Fully supports all RPE features described in this document                                                                                            |
| **4**               | PRPR Extensions           | Adds support for PRPR-specific extensions: custom shaders, unlock animations, etc.                                                                    |
| **5**               | Custom Extension          | Includes custom modifications to the chart structure                                                                                                  |

::: warning Notes
The specific storage location and setting method of the compatibility level field will be explained in later chapters.  
Using compatibility level **5** means your file may be rejected by most simulators.  
Simulators should reject charts with compatibility level **5** unless they have been extended to support such formats.
:::

::: danger Warning
Compatibility level **5** requires forking and modifying this document.  
Even with compatibility level **5**, existing fields must not be removed.
:::

## Coordinate System

The coordinate system used in this chart format has its origin in the bottom-left corner. The coordinate `(0, 0)` represents the bottom-left of the screen, and `(1, 1)` represents the top-right.

## Commitment

PhiCommonChart guarantees backward compatibility in future versions:
- Existing fields will never be removed
- Behavioral specifications will never be changed unless there is an error to fix
