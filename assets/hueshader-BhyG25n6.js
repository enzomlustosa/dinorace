loadShader(`hueShift`,null,`
uniform float u_amount;

vec3 hueShift(vec3 color, float angle) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosA = cos(angle);
    float sinA = sin(angle);

    return color * cosA
        + cross(k, color) * sinA
        + k * dot(k, color) * (1.0 - cosA);
}

vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
    vec4 c = def_frag();
    float angle = u_amount * 6.28318530718;
    c.rgb = hueShift(c.rgb, angle);
    return c;
}
`);
//# sourceMappingURL=hueshader-BhyG25n6.js.map